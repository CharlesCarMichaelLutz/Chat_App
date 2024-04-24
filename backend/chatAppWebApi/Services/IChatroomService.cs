using chatAppWebApi.Models;

namespace chatAppWebApi.Services
{
    public interface IChatroomService
    {
        Task<bool> CreateUser(UserModel user);
        Task<IEnumerable<UserModel>> GetAllUsers();
        Task<UserModel?> GetUser(int id);
        Task<bool> CreateMessage(MessageModel message);
        Task<IEnumerable<MessageModel>> GetAllMessages();
    }
}