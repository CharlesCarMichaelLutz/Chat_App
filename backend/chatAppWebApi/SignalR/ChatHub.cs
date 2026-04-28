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
        await Clients.Caller.Connected($"{Context.ConnectionId} has joined");
    }
}
