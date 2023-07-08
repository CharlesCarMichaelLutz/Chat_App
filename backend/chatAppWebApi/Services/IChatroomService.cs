using chatAppWebApi.Models;

namespace chatAppWebApi.Services
{
    public interface IChatroomService
    {
        Task<IEnumerable<MessageModel>> GetAllMessages();
        Task<MessageModel> CreateMessage(string username, string message);
        Task<IEnumerable<UserModel>> GetAllUsers();
        Task<UserModel> CreateUser(string username);
        Task<UserModel> GetUser(int id);
    }
}