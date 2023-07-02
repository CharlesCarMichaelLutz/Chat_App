using chatAppWebApi.Models;

namespace chatAppWebApi.Services
{
    public interface IChatroomService
    {
        Task<IEnumerable<UserModel>> GetAllMessages();
        Task<IEnumerable<UserModel>> SendMessage();
    }
}