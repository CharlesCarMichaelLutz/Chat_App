using chatAppWebApi.Models;
using chatAppWebApi.Repositories;
using System.Reflection.Metadata.Ecma335;

namespace chatAppWebApi.Services
{
    public class ChatroomService : IChatroomService
    {
        private readonly HttpClient _httpClient;
        public ChatroomService(HttpClient httpClient) 
        { 
            _httpClient = httpClient;
        }
        public async Task<IEnumerable<MessageModel>> GetAllMessages()
        {
            var allMessages = ChatroomRepository._messages;

            return await Task.FromResult(allMessages);
        }

        //public async Task<IEnumerable<UserModel>> CreateMessage()
        //{
        //    //return await Task.FromResult(ChatroomRepository._chatroom);
        //}

        //public async Task<IEnumerable<string>> GetAllUsers()
        //{
        //    var allUsers = ChatroomRepository._chatroom
        //        .Select(user => user.UserName)
        //        .ToList();

        //    return await Task.FromResult(allUsers);
        //}

        //public async Task<IEnumerable<UserModel>> CreateUser()
        //{
        //    //return await Task.FromResult(ChatroomRepository._chatroom);
        //}
        //public async Task<UserModel?> GetUser(int id)
        //{
        //    var getUser = ChatroomRepository._chatroom
        //        .SingleOrDefault(user => user.Id == id);
        //        //.ToList();

        //    return await Task.FromResult(getUser);
        //}
    }
}
