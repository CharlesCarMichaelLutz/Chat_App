using chatAppWebApi.Models;

namespace chatAppWebApi.Services
{
    public interface IChatroomService
    {
        Task<IEnumerable<MessageModel>> GetAllMessages();

        //Task<IEnumerable<UserModel>> CreateMessage();
        Task<IEnumerable<UserModel>> GetAllUsers();

        //Task<IEnumerable<UserModel>> CreateUser();
        Task<UserModel> GetUser(int id);
    }
}