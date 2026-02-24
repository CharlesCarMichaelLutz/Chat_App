using chatAppWebApi.Contracts.Responses;
using chatAppWebApi.Models;
using chatAppWebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace chatAppWebApi.SignalR;
public interface IChatHubClient
{
    Task Connected(string greeting);
    Task SendMessage(int userId, string message);
    Task DeleteMessage(int messageId);
    Task AddUser(UserResponse addUser);
}
public class ChatHub : Hub<IChatHubClient>
{
    private readonly IMessageService _messageService;
    private readonly IUserService _userService;
    public ChatHub(IMessageService messageService, IUserService userService)
    {
        _messageService = messageService;
        _userService = userService;
    }
    public override async Task OnConnectedAsync()
    {
        await Clients.All.Connected($"{Context.ConnectionId} has joined");
    }
    //public async Task AddUser(UserResponse addUser)
    //{
    //    await Clients.All.AddUser(addUser);
    //}

    //re-write client sends message (http), save in db, broadcast in signalR
    //public async Task SendMessage(int userId, string message)
    //{
    //    var model = new MessageModel
    //    {
    //        UserId = userId,
    //        Text = message,
    //        CreatedDate = DateTime.UtcNow
    //    };

    //    var response = await _messageService.CreateMessage(model);

    //    if (!response)
    //    {
    //        throw new Exception("Failed to create a message");
    //    }

    //    var dto = await _messageService.GetMessage();

    //    await Clients.All.SendAsync("PropagateMessageResponse", dto.MessageId, dto.UserId, dto.Text);
    //}

    //re-write client sends message (http), save in db, broadcast in signalR
    //public async Task DeleteMessage(int messageId)
    //{
    //    var response = await _messageService.DeleteMessage(messageId);

    //    if (!response)
    //    {
    //        throw new Exception("Failed to delete the message");
    //    }

    //    await Clients.All.SendAsync("DeleteMessageResponse", messageId);
    //}
}
