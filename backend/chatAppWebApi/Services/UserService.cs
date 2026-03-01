using chatAppWebApi.Contracts.Requests;
using chatAppWebApi.Contracts.Responses;
using chatAppWebApi.Domain;
using chatAppWebApi.Repositories;
using chatAppWebApi.SignalR;
using Microsoft.AspNetCore.SignalR;
using System.Reflection.Metadata.Ecma335;

namespace chatAppWebApi.Services;
public interface IUserService
{
    Task<LoginResponse> CreateUser(UserRequest request);
    Task<IEnumerable<UserResponse>> GetAllUsers();
    Task<LoginResponse> LoginUser(UserRequest request);
    Task<RefreshTokenResponse> CheckAndReplaceToken(RefreshTokenRequest request);
}
public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly ITokenService _tokenService;
    private readonly IHubContext<ChatHub, IChatHubClient> _hubContext;
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
    public async Task<LoginResponse> CreateUser(UserRequest request)
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
    public async Task<LoginResponse> LoginUser(UserRequest request)
    {
        var message = "Failed to login try again";

        var user = await _userRepository.GetUsernameAsync(request);

        if (user is null)
        {
            throw new Exception(message);
        }

        bool verified = _passwordHasher.Verify(request.Password, user.PasswordHash);

        if (!verified)
        {
            throw new Exception(message);
        }

        var accessToken = _tokenService.Create(user.Username);

        var refreshToken = new RefreshToken
        {
            UserId = user.Id,
            Token = _tokenService.GenerateRefreshToken(),
            ExpiresOnUtc = DateTime.UtcNow.AddDays(3),
            IsExpired = false
        };

        await _userRepository.SaveRefreshToken(refreshToken);

        return new LoginResponse
        {
            UserId = user.Id,
            Username = user.Username,
            AccessToken = accessToken,
            RefreshToken = refreshToken.Token
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
    public async void BroadCastNewUser(UserRequest request)
    {
        var getUser = await _userRepository.GetUsernameAsync(request);

        var user = new UserResponse
        {
            UserId = getUser.Id,
            Username = getUser.Username,
        };

        await _hubContext.Clients.All.AddUser(user);
    }
    public async Task<RefreshTokenResponse> CheckAndReplaceToken(RefreshTokenRequest request)
    {
        var refreshToken = await _userRepository.CheckAndInvalidateToken(request);

        //on the client the user would be forced to logout and sign-in to generate a new pair
        if (refreshToken == null || refreshToken.ExpiresOnUtc < DateTime.UtcNow)
        {
            throw new Exception("The refresh token has expired");
        }

        string accessToken = _tokenService.Create(request.Username);
        string replaceRefreshToken = _tokenService.GenerateRefreshToken();

        var saveToken = new RefreshToken
        {
            Token = replaceRefreshToken,
            UserId = request.UserId,
            ExpiresOnUtc = DateTime.UtcNow.AddDays(3),
            IsExpired = false
        };

        await _userRepository.SaveRefreshToken(saveToken);

        return new RefreshTokenResponse
        {
            AccessToken = accessToken,
            RefreshToken = replaceRefreshToken
        };
    }

    //On the client before you make a request
        //1 check the expiration of your JWT (accessToken)
        //If is in the past
            //send your accessToken and RefreshToken to refresh endpoint of API 
            //get a new pair back and use that for requests on the client
            //until that accessToken expires then repeat 
        //else send request with valid accessToken 
}
