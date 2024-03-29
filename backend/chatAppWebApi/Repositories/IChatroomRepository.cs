using chatAppWebApi.Models;

namespace chatAppWebApi.Repositories
{
    public interface IChatroomRepository
    {
        Task<MessageModel> CreateMessage(MessageModel message);
        Task<UserModel> CreateUser(UserModel user);
        Task<IEnumerable<MessageModel>> GetAllMessages();
        Task<IEnumerable<UserModel>> GetAllUsers();
        Task<IEnumerable<UserModel>> GetAll();
        Task<UserModel> GetUser(int id);
        int IncrementMessageId();
        int IncrementUserId();
    }
}