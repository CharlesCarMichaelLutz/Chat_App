using chatAppWebApi.Models;
using chatAppWebApi.Repositories;
using System.Text;

namespace chatAppWebApi.Services
{
    public interface IUserService
    {
        Task<bool> CreateUser(UserModel user);
        Task<IEnumerable<UserModel>> GetAllUsers();
        Task<UserModel?> GetUserByUsername(UserModel user);
    }

    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<bool> CreateUser(UserModel user)
        {
            var existingUser = await _userRepository.GetUserByUsernameAsync(user);
            if (existingUser is not null)
            {
                var message = $"A user with id {user.UserName} already exists";
                throw new Exception(message);
            }

            return await _userRepository.CreateUserAsync(user);
        }
        public async Task<IEnumerable<UserModel>> GetAllUsers()
        {
            return await _userRepository.GetAllUsersAsync();
        }

        public async Task<UserModel?> GetUserByUsername(UserModel user)
        {
            if(!string.IsNullOrEmpty(user.UserName) &&
               !string .IsNullOrEmpty(user.PasswordHash))
            {
                var loggedInUser = await _userRepository.GetUserByUsernameAsync(user);
                if(loggedInUser is not null) 
                { 
                    var message = $"username and/or password are incorrect try again";
                    throw new Exception(message);
                }

                return loggedInUser;

                //var token = await GetJwtToken();

                //return await Results.Ok(token);
            }
            return null;
        }

        //public static async Task<string> GetJwtToken()
        //{
        //    var token = new JwtSecurityToken
        //    (
                
        //    )
        //}
    }
}
