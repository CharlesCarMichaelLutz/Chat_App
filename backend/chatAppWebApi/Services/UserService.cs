using chatAppWebApi.Models;
using chatAppWebApi.Repositories;

namespace chatAppWebApi.Services
{
    public interface IUserService
    {
        Task<bool> CreateUser(UserModel user);
        Task<IEnumerable<UserModel>> GetAllUsers();
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
            var existingUser = await _userRepository.GetUserAsync(user.Id);
            if (existingUser is not null)
            {
                var message = $"A user with id {user.Id} already exists";
                throw new Exception(message);
            }

            return await _userRepository.CreateUserAsync(user);
        }
        public async Task<IEnumerable<UserModel>> GetAllUsers()
        {
            return await _userRepository.GetAllUsersAsync();
        }
    }
}
