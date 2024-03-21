using chatAppWebApi.Models;
using chatAppWebApi.Repositories;
using System.Reflection.Metadata.Ecma335;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace chatAppWebApi.Services
{
    public class ChatroomService : IChatroomService
    {
        private readonly HttpClient _httpClient;

        //private readonly IChatroomRepository chatroomRepository;
        public ChatroomService(HttpClient httpClient) 
        { 
            _httpClient = httpClient;
        }
        public async Task<IEnumerable<MessageModel>> GetAllMessages()
        {
            var allMessages = ChatroomRepository._messages;

            return await Task.FromResult(allMessages);
        }
        public async Task<MessageModel> CreateMessage(string username, string message)
        {
            var newMessage = new MessageModel
            {
                Id = IncrementMessageId(),
                UserName = username,
                Message = message,
            };

            ChatroomRepository._messages.Add(newMessage);

            return await Task.FromResult(newMessage);
        }
        public async Task<IEnumerable<UserModel>> GetAllUsers()
        {
            var allUsers = ChatroomRepository._users;

            return await Task.FromResult(allUsers);
        }
        public async Task<UserModel> CreateUser(string username)
        {
            var newUser = new UserModel
            {
                Id = IncrementUserId(),
                UserName = username,
            };

            ChatroomRepository._users.Add(newUser);

            return await Task.FromResult(newUser);
        }
        public async Task<UserModel?> GetUser(int id)
        {
            var getUser = ChatroomRepository._users
                .SingleOrDefault(user => user.Id == id);

            return await Task.FromResult(getUser);
        }
        private int IncrementMessageId()
        {
            int currentId = ChatroomRepository._messages.Max(message => message.Id);

            int newMessageId = currentId + 1;

            return newMessageId;
        }
        private int IncrementUserId()
        {
            int currentId = ChatroomRepository._users.Max(message => message.Id);

            int newUserId = currentId + 1;

            return newUserId;
        }
    }
}
