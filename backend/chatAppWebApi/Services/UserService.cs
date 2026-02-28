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
    //Task<LoginResponse> CreateUser(UserRequestDto request);
    Task<LoginResponseRefreshToken> CreateUser(UserRequestDto request);
    Task<IEnumerable<UserResponse>> GetAllUsers();
    //Task<LoginResponse> LoginUser(UserRequestDto request);
    Task<LoginResponseRefreshToken> LoginUser(UserRequestDto request);
    Task<RefreshTokenResponse> LoginUserWithRefreshToken(RefreshTokenRequest request);
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
    public async Task<LoginResponseRefreshToken> CreateUser(UserRequestDto request)
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
    public async Task<LoginResponseRefreshToken> LoginUser(UserRequestDto request)
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

        //save the refresh token in the database
        var refreshToken = new RefreshToken
        {
            UserId = user.Id,
            Token = _tokenService.GenerateRefreshToken(),
            ExpiresOnUtc = DateTime.UtcNow.AddDays(7)
        };

        await _userRepository.SaveRefreshToken(refreshToken);

        return new LoginResponseRefreshToken
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
    public async void BroadCastNewUser(UserRequestDto request)
    {
        var getUser = await _userRepository.GetUsernameAsync(request);

        var user = new UserResponse
        {
            UserId = getUser.Id,
            Username = getUser.Username,
        };

        await _hubContext.Clients.All.AddUser(user);
    }

    //always forcing the refreshToken endpoint to check for the latest accessToken

    public async Task<RefreshTokenResponse> CheckAndUpdateToken(RefreshTokenRequest request)
    {
        //if current RefreshToken is not expired generate a new accessToken
        //else generate a new refreshToken and accessToken pair 


        //get list of refresh tokens of current user from database
        var refreshToken = await _userRepository.GetRefreshTokensByUserId(request.UserId, request.RefreshToken);

        if (refreshToken == null || refreshToken.ExpiresOnUtc < DateTime.UtcNow)
        {
            throw new Exception("The refresh token has expired");
        }

        string accessToken = _tokenService.Create(request.Username);

        //save the new refresh token in the database
        refreshToken.Token = _tokenService.GenerateRefreshToken();

        var saveToken = new RefreshToken
        {
            Token = refreshToken.Token,
            UserId = request.UserId,
            ExpiresOnUtc = DateTime.UtcNow.AddDays(7),
        };

        await _userRepository.SaveRefreshToken(saveToken);

        return new RefreshTokenResponse
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken.Token
        };
    }

    //On the client before you make a request
        //1 check the expiration of your JWT (accessToken)
        //If is in the past
            //send your accessToken and RefreshToken to refresh enpoint of API 
            //get a new pair back and use that for requests on the client
            //until that accessToken expires then repeat 
        //else send request with valid accessToken 
}
