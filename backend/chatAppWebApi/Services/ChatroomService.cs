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
        public async Task<IEnumerable<MessageModel>> GetAllMessages()
        {
            //return await Task.FromResult(ChatroomRepository._chatroom);
            var allMessages = new List<MessageModel>();
            
            foreach (var user in ChatroomRepository._chatroom)
            {
                foreach (var messageModel in user.MessageModel)
                {
                        allMessages.Add(messageModel);
                }
            }
            return allMessages;
        }

        //public async Task<IEnumerable<UserModel>> SendMessage()
        //{
        //    //return await Task.FromResult(ChatroomRepository._chatroom);
        //}
    }
}
