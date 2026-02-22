using chatAppWebApi.Contracts.Requests;
using chatAppWebApi.Contracts.Responses;
using chatAppWebApi.Models;
using chatAppWebApi.Repositories;

namespace chatAppWebApi.Services;
public interface IUserService
{
    Task<LoginResponse> CreateUser(UserRequestDto request);
    Task<IEnumerable<UserModel>> GetAllUsers();
    Task<LoginResponse> LoginUser(UserRequestDto request);
}
public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly ITokenService _tokenService;
    public UserService(IUserRepository userRepository,IPasswordHasher passwordHasher, ITokenService tokenService)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
    }
    public async Task<LoginResponse> CreateUser(UserRequestDto request)
    {
        var message = "Failed to create user try again";

        var checkUsername = await _userRepository.GetUsernameAsync(request);

        if (checkUsername is not null)
        {
            throw new Exception(message);
        }

        var user = new UserModel
        {
            Username = request.Username,
            PasswordHash = _passwordHasher.Hash(request.Password),
            CreatedDate = DateTime.UtcNow,
        };

        var result = await _userRepository.CreateUserAsync(user);

        if(result)
        {
            return await LoginUser(request);
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
    public async Task<IEnumerable<UserModel>> GetAllUsers()
    {
        var userlist = await _userRepository.GetAllUsersAsync();

        return userlist.Select(u => new UserModel
        {
            Id = u.UserId,
            Username = u.Username,
        });
    }
}
