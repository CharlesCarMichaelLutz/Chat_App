using chatAppWebApi.Database;
using chatAppWebApi.Models;
using Dapper;
using Npgsql;
using System.Data;

namespace chatAppWebApi.Repositories
{
    //Mock Repository created for initial testing
    public class ChatroomRepository : IChatroomRepository
    {
        private readonly IPostgreSqlConnectionFactory _connectionFactory;
        public ChatroomRepository(IPostgreSqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }
        public async Task<IEnumerable<MessageModel>> GetAllAsync()
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            return await connection.QueryAsync<MessageModel>("SELECT * FROM Messages");
        }
        public async Task<MessageModel> CreateMessage(MessageModel newMessage)
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            _messages.Add(newMessage);

            return newMessage;
        }
        public async Task<IEnumerable<UserModel>> GetAll()
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            return _users;
        }
        public async Task<UserModel> CreateUser(UserModel user)
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            _users.Add(user);

            return user;
        }
        public async Task<UserModel?> GetUser(int id)
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

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
                    UserId = "User A",
                    Text = "Greetings everyone!"
                },
                new MessageModel()
                {
                    Id = 2,
                    UserId = "User B",
                    Text = "Welcome User A!"
                },
                new MessageModel()
                {
                    Id = 3,
                    UserId = "User B", 
                    Text = "I would like to visit the beach soon"
                },
                new MessageModel()
                {
                    Id = 4,
                    UserId = "User B", 
                    Text = "And I won't forget to bring sunscreen"
                },
                 new MessageModel()
                {
                    Id = 5,
                    UserId = "User D", 
                    Text = "That's agreed User B"
                },
                new MessageModel()
                {
                    Id = 6,
                    UserId = "User C",
                    Text = "I am looking forward to a good one"
                },
                new MessageModel()
                {
                    Id = 7,
                    UserId = "User D",
                    Text = "Let's have a great summer"
                }
            };
    }
}
