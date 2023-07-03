using chatAppWebApi.Models;

namespace chatAppWebApi.Services
{
    public interface IChatroomService
    {
        Task<IEnumerable<MessageModel>> GetAllMessages();
        //Task<IEnumerable<UserModel>> SendMessage();
    }
}