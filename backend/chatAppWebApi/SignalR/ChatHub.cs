using chatAppWebApi.Models;
using chatAppWebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace chatAppWebApi.SignalR

{
    //public class ChatHub : Hub<IChatClient>
    public class ChatHub : Hub

    {
        private readonly IMessageService _messageService;

        public ChatHub(IMessageService messageService)
        {
            _messageService = messageService;
        }
        //Working as expected
        //public async Task SendMessage(int userId, string message, int messageId)
        //{
        //    await Clients.All.SendAsync("PropagateMessageResponse", userId, message, messageId);
        //}

        public async Task SendMessage(int userId, string message)
        {
            var model = new MessageModel
            {
                UserId = userId,
                Text = message,
                CreatedDate = DateTime.UtcNow
            };

            //save message to DB
            var response = await _messageService.CreateMessage(model);

            if (!response)
            {
                throw new Exception("Failed to create a message");

            }
            //get message DTO with ID from DB
            var messageDTO = await _messageService.GetMessage();

            //propagate DTO to all connected clients
            await Clients.All.SendAsync("PropagateMessageResponse", messageDTO.MessageId, messageDTO.UserId, messageDTO.Text);
        }

        //make functions/methods of client/server strongly typed

        //Working as expected
        //public async Task DeleteMessage(int messageId)
        //{
        //    await Clients.All.SendAsync("DeleteMessageResponse", messageId);
        //}
        public async Task DeleteMessage(int messageId)
        {
            var response = await _messageService.DeleteMessage(messageId);
            if (!response)
            {
                throw new Exception("Failed to delete the message");

            }
            //propagate deletion to all connected clients

            await Clients.All.SendAsync("DeleteMessageResponse", messageId);
        }

        //make functions/methods of client/server strongly typed

        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("ReceiveMessage", $"{Context.ConnectionId} has joined");
        }

    }
}

