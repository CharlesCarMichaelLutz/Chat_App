using chatAppWebApi.Models;
using chatAppWebApi.Repositories;
using System.Reflection.Metadata.Ecma335;

namespace chatAppWebApi.Services
{
    public class ChatroomService : IChatroomService
    {
        private readonly HttpClient _httpClient;
        //private readonly ChatroomModel _chatroomModel;
        public ChatroomService(HttpClient httpClient) 
        { 
            _httpClient = httpClient;
            //_chatroomModel = chatroomModel;
        }
        public async Task<IEnumerable<UserModel>> GetAllMessages()
        {
            return await Task.FromResult(ChatroomRepository._chatroom);
        }

        public async Task<IEnumerable<UserModel>> SendMessage()
        {
            return await Task.FromResult(ChatroomRepository._chatroom);
        }
    }
}
