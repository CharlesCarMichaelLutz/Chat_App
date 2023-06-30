using chatAppWebApi.Models;
using System.Reflection.Metadata.Ecma335;

namespace chatAppWebApi.Services
{
    public class ChatroomService : IChatroomService
    {
        private readonly HttpClient _httpClient;
        private readonly ChatroomModel _chatroomModel;
        public ChatroomService(HttpClient httpClient, ChatroomModel chatroomModel) 
        { 
            _httpClient = httpClient;
            _chatroomModel = chatroomModel;
        }
        public async Task<IEnumerable<Messages>> GetAllMessages()
        {
            var allMessages = new List<Messages>();

            return allMessages;
        }
    }
}
