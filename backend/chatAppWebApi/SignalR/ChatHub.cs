using chatAppWebApi.Contracts.Responses;
using chatAppWebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace chatAppWebApi.SignalR;
public interface IChatHubClient
{
    Task Connected(string greeting);
    Task SendMessage(MessageResponse message);
    Task DeleteMessageById(MessageResponse message);
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
    //public async Task SendMessage(MessageResponse message)
    //{
    //    await Clients.All.SendMessage(message);
    //}

    //re-write client sends message (http), save in db, broadcast in signalR
    //public async Task DeleteMessageById(MessageResponse message)
    //{
    //    await Clients.All.DeleteMessageById(message);
    //}
}
