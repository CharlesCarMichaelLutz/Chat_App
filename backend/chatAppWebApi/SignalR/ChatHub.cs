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
        //Working as expected
        public async Task SendMessage(int userId, string message, int messageId)
        {
            await Clients.All.SendAsync("PropagateMessageResponse", userId, message, messageId);
        }

        //make functions/methods of client/server strongly typed

        //Working as expected
        public async Task DeleteMessage(int messageId)
        {
            await Clients.All.SendAsync("DeleteMessageResponse", messageId);
        }

        //make functions/methods of client/server strongly typed

        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("ReceiveMessage", $"{Context.ConnectionId} has joined");
        }

    }
}

