using chatAppWebApi.Models;
using chatAppWebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace chatAppWebApi.SignalR

{
    public class ChatHub : Hub
    {
        private readonly IMessageService _messageService;
        private readonly IUserService _userService;
        public ChatHub(IMessageService messageService, IUserService userService)
        {
            _messageService = messageService;
            _userService = userService;
        }
        public async Task GetMessageList(string token)
        {
            var response = await _messageService.GetAllMessages();

            await Clients.All.SendAsync("PropagateMessageListResponse", response);

        }

        public async Task GetUserList(string token)
        {
            var response = await _userService.GetAllUsers();

            await Clients.All.SendAsync("PropagateUserListResponse", response);

        }

        public async Task SendMessage(int userId, string message)
        {
            var model = new MessageModel
            {
                UserId = userId,
                Text = message,
                CreatedDate = DateTime.UtcNow
            };

            //Console.WriteLine($"Creating message with UserId: {userId}, Message: {message}");

            var response = await _messageService.CreateMessage(model);

            //Console.WriteLine($"CreateMessage response: {response}");

            if (!response)
            {
                throw new Exception("Failed to create a message");
            }

            //Console.WriteLine("Fetching message DTO from DB");

            var dto = await _messageService.GetMessage();

            //Console.WriteLine($"Fetched DTO: MessageId: {dto.MessageId}, UserId: {dto.UserId}, Text: {dto.Text}");

            await Clients.All.SendAsync("PropagateMessageResponse", dto.MessageId, dto.UserId, dto.Text);
        }

        public async Task DeleteMessage(int messageId)
        {
            var response = await _messageService.DeleteMessage(messageId);

            if (!response)
            {
                throw new Exception("Failed to delete the message");
            }

            await Clients.All.SendAsync("DeleteMessageResponse", messageId);
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("ReceiveMessage", $"{Context.ConnectionId} has joined");
        }
    }
}
