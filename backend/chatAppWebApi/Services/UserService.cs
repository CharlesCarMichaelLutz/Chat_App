using chatAppWebApi.Models;
using chatAppWebApi.Repositories;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using BCrypt.Net;

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
        public UserService(IUserRepository userRepository, IOptions<JwtCredentials> jwtCredentials)
        {
            _userRepository = userRepository;
            _jwtCredentials = jwtCredentials.Value;
        }
        public async Task<bool> CreateUser(UserModel user)
        {
            var existingUser = await _userRepository.GetUsernameAsync(user);
            if (existingUser is not null)
            {
                var message = $"A user with id {user.Username} already exists";
                throw new Exception(message);
            }

            var clientPassword = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            var newUser = new UserModel
            {
                Username = user.Username,
                PasswordHash = clientPassword,
                CreatedDate = user.CreatedDate
            };

            return await _userRepository.CreateUserAsync(newUser);
        }
        public async Task<IEnumerable<UserModel>> GetAllUsers()
        {
            return await _userRepository.GetAllUsersAsync();
        }

        public async Task<IResult?> LoginUser(UserModel user)
        {
            if(!string.IsNullOrEmpty(user.Username) &&
               !string .IsNullOrEmpty(user.PasswordHash))
            {
                var loggedInUser = await _userRepository.GetUserLogin(user);
                if(loggedInUser is not null) 
                {
                    throw new Exception("User not found");
                }

                var tokenString = await GenerateJwtToken();

                return Results.Ok(tokenString);
            }
            return Results.BadRequest("Incorrect username and/or password entered");
        }

        private async Task<string> GenerateJwtToken()
        {
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
