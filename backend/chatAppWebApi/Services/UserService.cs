namespace chatAppWebApi.Services;
public interface IUserService
{
    Task<LoginResponse> CreateUser(UserRequest request);
    Task<IEnumerable<UserResponse>> GetAllUsers();
    Task<LoginResponse> LoginUser(UserRequest request);
    Task<RefreshTokenResponse> CheckAndReplaceToken();
}
public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly ITokenService _tokenService;
    private readonly IHubContext<ChatHub, IChatHubClient> _hubContext;
    private readonly IHttpContextAccessor _contextAccessor;
    public UserService(
        IUserRepository userRepository,
        IPasswordHasher passwordHasher,
        ITokenService tokenService,
        IHubContext<ChatHub, IChatHubClient> hubContext,
        IHttpContextAccessor contextAccessor)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
        _hubContext = hubContext;
        _contextAccessor = contextAccessor;
    }
    public async Task<LoginResponse> CreateUser(UserRequest request)
    {
        const string message = "Failed to create user try again";

        var checkExistingUser = await _userRepository.GetUsernameAsync(request);
        
        if (checkExistingUser is not null)
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
        const string message = "Failed to login try again";

        var user = await _userRepository.GetUsernameAsync(request) ?? throw new Exception(message);
        bool verified = _passwordHasher.Verify(request.Password, user.PasswordHash);

        if (!verified)
        {
            throw new Exception(message);
        }

        var accessToken = _tokenService.Create(user.Username);

        var saveToken = new RefreshToken
        {
            UserId = user.Id,
            Token = _tokenService.GenerateRefreshToken(),
            ExpiresOnUtc = DateTime.UtcNow.AddDays(3),
            IsExpired = false
        };

        await _userRepository.SaveRefreshToken(saveToken);

        SetRefreshToken(saveToken);

        var response =  new LoginResponse
        {
            UserId = user.Id,
            Username = user.Username,
            AccessToken = accessToken,
        };
        return response;
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
    public async Task<RefreshTokenResponse> CheckAndReplaceToken()
    {
        var refreshTolken = _contextAccessor.HttpContext?.Request.Cookies["RefreshToken"];

        var transfer = new RefreshTokenRequest
        {
            Token = refreshTolken,
            IsExpired = true
        };

        var refreshToken = await _userRepository.CheckAndInvalidateToken(transfer);

        if (refreshToken == null || refreshToken.ExpiresOnUtc < DateTime.UtcNow)
        {
            throw new Exception("The refresh token has expired");
        }

        var user = await _userRepository.GetUserById(refreshToken.UserId);

        if (user == null)
        {
            throw new Exception("Could not get the user");
        }

        string accessToken = _tokenService.Create(user.Username);
        string replaceRefreshToken = _tokenService.GenerateRefreshToken();

        var saveToken = new RefreshToken
        {
            Token = replaceRefreshToken,
            UserId = user.Id,
            ExpiresOnUtc = DateTime.UtcNow.AddDays(3),
            IsExpired = false
        };

        await _userRepository.SaveRefreshToken(saveToken);

        SetRefreshToken(saveToken);

        return new RefreshTokenResponse
        {
            AccessToken = accessToken,
        };
    }
    public void SetRefreshToken(RefreshToken refreshToken)
    {
        ////production
        //var options = new CookieOptions
        //{
        //    Expires = refreshToken.ExpiresOnUtc,
        //    HttpOnly = true,
        //    Secure = true,
        //    IsEssential = true,
        //    SameSite = SameSiteMode.None
        //};

        //development
        var options = new CookieOptions
        {
            Expires = refreshToken.ExpiresOnUtc,
            HttpOnly = true,
            Secure = false,
            IsEssential = true,
            SameSite = SameSiteMode.Lax
        };

        _contextAccessor.HttpContext?.Response.Cookies.Append("RefreshToken", refreshToken.Token, options);
    }
}
