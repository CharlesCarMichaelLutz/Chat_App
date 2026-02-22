using chatAppWebApi.Models;
using chatAppWebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace chatAppWebApi.SignalR;
public class ChatHub : Hub
{
    private readonly IMessageService _messageService;
    private readonly IUserService _userService;
    public ChatHub(IMessageService messageService, IUserService userService)
    {
        _messageService = messageService;
        _userService = userService;
    }
    
    //move endpoint to Program.cs
    public async Task GetMessageList()
    {
        var response = await _messageService.GetAllMessages();

        await Clients.All.SendAsync("PropagateMessageListResponse", response);
    }

    //move endpoint to Program.cs
    public async Task GetUserList()
    {
        var response = await _userService.GetAllUsers();

        await Clients.All.SendAsync("PropagateUserListResponse", response);
    }

    //[Authorize]
    public async Task SendMessage(int userId, string message)
    {
        var model = new MessageModel
        {
            UserId = userId,
            Text = message,
            CreatedDate = DateTime.UtcNow
        };

        var response = await _messageService.CreateMessage(model);

        if (!response)
        {
            throw new Exception("Failed to create a message");
        }

        var dto = await _messageService.GetMessage();

        await Clients.All.SendAsync("PropagateMessageResponse", dto.MessageId, dto.UserId, dto.Text);
    }

    //[Authorize]
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
