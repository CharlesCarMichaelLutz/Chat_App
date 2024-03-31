using chatAppWebApi.Models;
using Dapper;
using Npgsql;
using System.Data;

namespace chatAppWebApi.Repositories
{
    //Mock Repository created for initial testing
    public class ChatroomRepository : IChatroomRepository
    {
        //private readonly IDbConnection _connection;
        public ChatroomRepository(IConfiguration config)
        {
            //_connection = new NpgsqlConnection(config.GetConnectionString("RabbitChatDb"));
        }
        public async Task<IEnumerable<MessageModel>> GetAllAsync()
        {
            using var connection = _connection;
            return await connection.QueryAsync<MessageModel>("SELECT * FROM Messages");
        }
        public async Task<MessageModel> CreateMessage(MessageModel newMessage)
        {
            _messages.Add(newMessage);

            return newMessage;
        }
        public async Task<IEnumerable<UserModel>> GetAll()
        {
            return _users;
        }
        public async Task<UserModel> CreateUser(UserModel user)
        {
            _users.Add(user);

            return user;
        }
        public async Task<UserModel?> GetUser(int id)
        {
            var existingUser = _users.SingleOrDefault(user => user.Id == id);

            return existingUser;
        }
        public int IncrementMessageId()
        {
            int currentId = _users.Max(message => message.Id);

            int newMessageId = currentId + 1;

            return newMessageId;
        }

        public int IncrementUserId()
        {
            int currentId = _users.Max(message => message.Id);

            int newUserId = currentId + 1;

            return newUserId;
        }

        public Task<IEnumerable<UserModel>> GetAllUsers()
        {
            throw new NotImplementedException();
        }


        //Data Store 
        public static List<UserModel> _users = new()
            {
                new UserModel()
                {
                    Id = 1,
                    UserName = "User A",
                },
                new UserModel()
                {
                    Id = 2,
                    UserName = "User B",
                },
                 new UserModel()
                {
                    Id = 3,
                    UserName = "User C",
                },
                 new UserModel()
                {
                    Id = 4,
                    UserName = "User D"
                }
            };

        public static List<MessageModel> _messages = new()
            {
                new MessageModel()
                {
                    Id = 1,
                    UserName = "User A",
                    Message = "Greetings everyone!"
                },
                new MessageModel()
                {
                    Id = 2,
                    UserName = "User B",
                    Message = "Welcome User A!"
                },
                new MessageModel()
                {
                    Id = 3,
                    UserName = "User B",
                    Message = "I would like to visit the beach soon"
                },
                new MessageModel()
                {
                    Id = 4,
                    UserName = "User B",
                    Message = "And I won't forget to bring sunscreen"
                },
                 new MessageModel()
                {
                    Id = 5,
                    UserName = "User D",
                    Message = "That's agreed User B"
                },
                new MessageModel()
                {
                    Id = 6,
                    UserName = "User C",
                    Message = "I am looking forward to a good one"
                },
                new MessageModel()
                {
                    Id = 7,
                    UserName = "User D",
                    Message = "Let's have a great summer"
                }
            };
    }
}
