using chatAppWebApi.Models;
using chatAppWebApi.Repositories;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using BCrypt.Net;
using System.Security.Claims;
using System.Data.Common;
using chatAppWebApi.SignalR;
using Microsoft.AspNetCore.SignalR;

namespace chatAppWebApi.Services
{
    public interface IUserService
    {
        Task<bool> CreateUser(UserModel user);
        Task<IEnumerable<UserModel>> GetAllUsers();
        Task<IResult?> LoginUser(UserModel user);
    }

    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtCredentials _jwtCredentials;
        private readonly IHubContext<ChatHub> _hubContext;
        public UserService(IUserRepository userRepository, IOptions<JwtCredentials> jwtCredentials, IHubContext<ChatHub> hubContext)
        {
            _userRepository = userRepository;
            _jwtCredentials = jwtCredentials.Value;
            _hubContext = hubContext;
        }
        public async Task<bool> CreateUser(UserModel user)
        {
            //implement validation that matches username and password on the client  

            var existingUser = await _userRepository.GetUsernameAsync(user);
            if (existingUser is not null)
            {
                var message = $"A user with {user.Username} already exists";
                throw new Exception(message);
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            var newUser = new UserModel
            {
                Username = user.Username,
                PasswordHash = hashedPassword,
                CreatedDate = DateTime.UtcNow,
            };

            var result = await _userRepository.CreateUserAsync(newUser);

            if (result)
            {
                //call GetUserList method from ChatHub after new user has been created

                var updatedUserList = await _userRepository.GetAllUsersAsync();
                await _hubContext.Clients.All.SendAsync("PropagateUserListResponse", updatedUserList);
            }

            return result;
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
        public async Task<IResult?> LoginUser(UserModel user)
        {
            var loggedInUser = await _userRepository.GetUsernameAsync(user);

            if (loggedInUser is null || !BCrypt.Net.BCrypt.Verify(user.PasswordHash, loggedInUser.PasswordHash))
            {
                throw new Exception("Incorrect username or password");
            }

            var tokenString = await GenerateJwtToken(loggedInUser);

            var response = new LoginResponse
            {
                UserId = loggedInUser.Id,
                Token = tokenString,
                Username = user.Username,
            };

            return Results.Ok(response);
        }

        private async Task<string> GenerateJwtToken(UserModel user)
        {
           var claims = new[]
           {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
           };

           var token = new JwtSecurityToken
           (
               issuer: _jwtCredentials.Issuer,
               audience: _jwtCredentials.Audience,
               expires: DateTime.UtcNow.AddHours(2),
               notBefore: DateTime.UtcNow,
               signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtCredentials.Key)),
                    SecurityAlgorithms.HmacSha256)
           );

           return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
