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
        public async Task<IEnumerable<MessageModel>> GetAllMessages()
        {
            return await _chatroomRepository.GetAllMessages();
        }
        public async Task<MessageModel> CreateMessage(string username, string message)
        {
            var newMessage = new MessageModel
            {
                Id = IncrementMessageId(),
                UserName = username,
                Message = message,
            };

            var response = await _chatroomRepository.CreateMessage(newMessage);

            if (response is not null)
            {
                return response;
            }
            else
            {
                throw new Exception();
            };
        }
        public async Task<IEnumerable<UserModel>> GetAllUsers()
        {
            var allUsers = await _chatroomRepository.GetAll();

            if (allUsers is not null) 
            {
                return allUsers;   
            }
            else
            {
                throw new Exception();
            };

        }
        public async Task<UserModel> CreateUser(string username)
        {
            var newUser = new UserModel
            {
                Id = IncrementUserId(),
                UserName = username,
            };

            var response = await _chatroomRepository.CreateUser(newUser);

            if (response is not null)
            {
                return response;
            }
            else
            {
                throw new Exception();
            };
        }
        public async Task<UserModel?> GetUser(int id)
        {
            var existingUser = await _chatroomRepository.GetUser(id);
            
            if(existingUser is not null)
            {
                return existingUser;
            }
            else
            {
                throw new Exception();
            }
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
