using chatAppWebApi.Models;
using chatAppWebApi.Services;
using Microsoft.AspNetCore.SignalR;

namespace chatAppWebApi.SignalR

{
    public class ChatHub : Hub
    {
        private readonly IMessageService _messageService;
        public ChatHub(IMessageService messageService)
        {
            _messageService = messageService;
        }
        //Working as expected
        //public async Task SendMessage(string userId, string message)
        //{
        //    await Clients.All.SendAsync("CreateMessageResponse", userId, message);
        //}
        public async Task SendMessage(int userId, string text)
        {
            // call MessageService
            //save message to DB and get message Id

            //re shape data to include id for message and return MessageDTO object
            //perhaps that can be done inside MessageService?

            var messageDto = await _messageService.CreateMessage(new MessageModel
            {
                UserId = userId,
                Text = text,
                CreatedDate = DateTime.UtcNow,
            });

            await Clients.All.SendAsync("CreateMessageResponse", messageDto);
        }

        //Add id into response so client can match correctly

        //public async Task SendMessage(int userId, string message)
        //{
        //    //save message to DB from messageService/messageRepository
        //    //retunr a mess
        //    await Clients.All.SendAsync("CreateMessageResponse",id, userId, message);
        //}

        //Working as expected

        //public async Task DeleteMessage(int messageId)
        //{
        //    //delete message from DB at messageService/messageRepository

        //    await Clients.All.SendAsync("DeleteMessageResponse", messageId);
        //}

        public async Task DeleteMessage(int messageId)
        {
            //delete message from DB at messageService/messageRepository

            await Clients.All.SendAsync("DeleteMessageResponse", messageId);
        }

        //public override async Task OnConnectedAsync()
        //{
        //    await Clients.All.SendAsync("ReceiveMessage", $"{Context.ConnectionId} has joined");
        //}

    }
}

//realized that data being sent over from client is not being serialized