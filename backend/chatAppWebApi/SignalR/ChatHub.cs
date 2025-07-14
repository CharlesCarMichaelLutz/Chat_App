using chatAppWebApi.Models;
using chatAppWebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace chatAppWebApi.SignalR

{
    //[Authorize]
    //public class ChatHub : Hub<IChatClient>
    public class ChatHub : Hub

    {
        private readonly IMessageService _messageService;
        public ChatHub(IMessageService messageService)
        {
            _messageService = messageService;
        }

        //Working as expected
        //public async Task SendMessage(int userId, string message)
        //{
        //    await Clients.All.SendMessage(userId, message);
        //}
        public async Task SendMessage(int userId, string text, int id )
        {
            var savedMessage = await _messageService.CreateMessage(new MessageModel
            {
                UserId = userId,
                Text = text,
                CreatedDate = DateTime.UtcNow,
            });

            if (savedMessage)
            {
                var response = await _messageService.GetMessage();
                await Clients.All.SendAsync("CreateMessageResponse", response.MessageId, response.UserId, response.Text);
            };
        }

        //Working as expected
        public async Task DeleteMessage(int messageId)
        {
            //delete message from DB at messageService/messageRepository

            await Clients.All.SendAsync("DeleteMessageResponse", messageId);
        }

        //public async Task DeleteMessage(int messageId)
        //{
        //    //save message to DB from messageService/messageRepository
        //    //retunr a mess
        //    await Clients.All.DeleteMessage(messageId);
        //}

        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("ReceiveMessage", $"{Context.ConnectionId} has joined");
        }

    }
}

