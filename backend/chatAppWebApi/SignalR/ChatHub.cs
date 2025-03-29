using Microsoft.AspNetCore.SignalR;

namespace chatAppWebApi.SignalR

{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task RemoveMessage(int messageId)
        {
            await Clients.All.SendAsync("MessageDeleted", messageId);
        }

        //public override async Task OnConnectedAsync()
        //{
        //    await Clients.All.SendAsync("ReceiveMessage", $"{Context.ConnectionId} has joined");
        //}

    }
}


