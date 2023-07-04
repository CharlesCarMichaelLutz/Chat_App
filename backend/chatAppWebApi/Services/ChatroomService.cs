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
            var allMessages = ChatroomRepository._chatroom
                .SelectMany(user => user.MessageModel)
                .ToList();

            return await Task.FromResult(allMessages);
        }

        //public async Task<IEnumerable<UserModel>> CreateMessage()
        //{
        //    //return await Task.FromResult(ChatroomRepository._chatroom);
        //}

        public async Task<IEnumerable<string>> GetAllUsers()
        {
            var allUsers = ChatroomRepository._chatroom
                .Select(user => user.UserName)
                .ToList();

            return await Task.FromResult(allUsers);
        }

        //public async Task<IEnumerable<UserModel>> CreateUser()
        //{
        //    //return await Task.FromResult(ChatroomRepository._chatroom);
        //}
        public async Task<IEnumerable<string>> GetUser()
        {
            var allUsers = ChatroomRepository._chatroom
                .Select(user => user.UserName)
                .ToList();

            return await Task.FromResult(allUsers);
        }
    }
}
