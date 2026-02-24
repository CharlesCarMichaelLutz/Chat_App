using chatAppWebApi.Contracts.Requests;
using chatAppWebApi.Contracts.Responses;
using chatAppWebApi.Domain;
using chatAppWebApi.Repositories;
using chatAppWebApi.SignalR;
using Microsoft.AspNetCore.SignalR;

namespace chatAppWebApi.Services;
public interface IUserService
{
    Task<LoginResponse> CreateUser(UserRequestDto request);
    Task<IEnumerable<UserResponse>> GetAllUsers();
    Task<LoginResponse> LoginUser(UserRequestDto request);
}
public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly ITokenService _tokenService;
    private readonly IHubContext<ChatHub,IChatHubClient> _hubContext;
    public UserService(
        IUserRepository userRepository,
        IPasswordHasher passwordHasher, 
        ITokenService tokenService, 
        IHubContext<ChatHub, IChatHubClient> hubContext)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
        _hubContext = hubContext;
    }
    public async Task<LoginResponse> CreateUser(UserRequestDto request)
    {
        var message = "Failed to create user try again";

        var checkUsername = await _userRepository.GetUsernameAsync(request);

        if (checkUsername is not null)
        {
            throw new Exception(message);
        }

        var user = new User
        {
            Username = request.Username,
            PasswordHash = _passwordHasher.Hash(request.Password),
            CreatedDate = DateTime.UtcNow,
        };

        var result = await _userRepository.CreateUserAsync(user);

        if (result)
        {
            var loginSuccess = await LoginUser(request);

            BroadCastNewUser(request);

            return loginSuccess;
        }

        throw new Exception(message);
    }
    public async Task<LoginResponse> LoginUser(UserRequestDto request)
    {
        var message = "Failed to login try again";

        var user = await _userRepository.GetUsernameAsync(request);

        if (user is null)
        {
            throw new Exception(message);
        }

        bool verified = _passwordHasher.Verify(request.Password, user.PasswordHash);

        if(!verified)
        {
            throw new Exception(message);
        }

        var token = _tokenService.Create(user.Username);

        return new LoginResponse
        {
            UserId = user.Id,
            Username = user.Username,
            Token = token
        };
    }
    public async Task<IEnumerable<UserResponse>> GetAllUsers()
    {
        var userlist = await _userRepository.GetAllUsersAsync();

        return userlist.Select(u => new UserResponse
        {
            UserId = u.UserId,
            Username = u.Username,
        });
    }
    //broadcast new user to client and append to userlist
    public async void BroadCastNewUser(UserRequestDto request)
    {
        var getUser = await _userRepository.GetUsernameAsync(request);

        var user = new UserResponse
        {
            UserId = getUser.Id,
            Username= getUser.Username,
        };

        await _hubContext.Clients.All.AddUser(user);
    }
}
