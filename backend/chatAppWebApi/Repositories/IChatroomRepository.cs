using chatAppWebApi.Models;

namespace chatAppWebApi.Repositories
{
    public interface IChatroomRepository
    {
        Task<bool> CreateUserAsync(UserModel user);
        Task<IEnumerable<UserModel>> GetAllUsersAsync();
        Task<UserModel?> GetUserAsync(int id);
        Task<bool> CreateMessageAsync(MessageModel message);
        Task<IEnumerable<MessageModel>> GetAllMessagesAsync();
    }
}