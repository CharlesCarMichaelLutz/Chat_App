using chatAppWebApi.Database;
using chatAppWebApi.Models;
using Dapper;
using Npgsql;
using System.Data;

namespace chatAppWebApi.Repositories
{
    public class ChatroomRepository : IChatroomRepository
    {
        private readonly IPostgreSqlConnectionFactory _connectionFactory;
        public ChatroomRepository(IPostgreSqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }
        public async Task<bool> CreateUserAsync(UserModel user)
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            var result = await connection.ExecuteAsync(
                @"INSERT INTO User (Id, UserName, CreatedDate) 
                VALUES (@Id, @UserName, @CreatedDate)", 
                user);

            return result > 0;
        }
        public async Task<IEnumerable<UserModel>> GetAllUsersAsync()
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            return await connection.QueryAsync<UserModel>("SELECT * FROM User");
        }
        public async Task<UserModel?> GetUserAsync(int id)
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            return await connection.QuerySingleOrDefaultAsync<UserModel>(
                "SELECT * FROM User WHERE Id = @Id LIMIT 1", new { Id = id.ToString() });
        }
        public async Task<bool> CreateMessageAsync(MessageModel message)
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            var result = await connection.ExecuteAsync(
            @"INSERT INTO Message (Id, UserId, Text, CreatedDate) 
                VALUES (@Id, @UserId, @Text, @CreatedDate)",
            message);

            return result > 0;
        }
        public async Task<IEnumerable<MessageModel>> GetAllMessagesAsync()
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            return await connection.QueryAsync<MessageModel>("SELECT * FROM Message");
        }
    }
}
