using chatAppWebApi.Models;
using chatAppWebApi.Repositories;
using System.Reflection.Metadata.Ecma335;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace chatAppWebApi.Services
{
    public class ChatroomService : IChatroomService
    {
        private readonly IChatroomRepository _chatroomRepository;
        public ChatroomService(IChatroomRepository chatroomRepository) 
        {
            _chatroomRepository = chatroomRepository;
        }
        public async Task<bool> CreateUser(UserModel user)
        {
            var existingUser = await _chatroomRepository.GetUserAsync(user.Id);
            if (existingUser is not null)
            {
                var message = $"A user with id {user.Id} already exists";
                throw new Exception(message);
            }

            return await _chatroomRepository.CreateUserAsync(user);
        }
        public async Task<IEnumerable<UserModel>> GetAllUsers()
        {
            return await _chatroomRepository.GetAllUsersAsync();
        }
        public async Task<UserModel?> GetUser(int id)
        {
            return await _chatroomRepository.GetUserAsync(id);
        }
        public async Task<bool> CreateMessage(MessageModel message)
        {
            return await _chatroomRepository.CreateMessageAsync(message);
        }
        public async Task<IEnumerable<MessageModel>> GetAllMessages()
        {
            return await _chatroomRepository.GetAllMessagesAsync();
        }
    }
}
