using chatAppWebApi.Database;
using chatAppWebApi.Models;
using Dapper;
using Microsoft.IdentityModel.Tokens;
using System.Data;

namespace chatAppWebApi.Repositories
{
    public interface IMessageRepository
    {
        Task<bool> CreateMessageAsync(MessageModel message);
        Task<IEnumerable<MessageModel>> GetAllMessagesAsync();
        Task<MessageModel?> GetMessageAsync(int id);
    }
    public class MessageRepository : IMessageRepository
    {
        private readonly IPostgreSqlConnectionFactory _connectionFactory;
        public MessageRepository(IPostgreSqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }
        public async Task<bool> CreateMessageAsync(MessageModel message)
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            var result = await connection.ExecuteAsync(
            @"INSERT INTO messages (UserId, Text, CreatedDate) 
                VALUES (@UserId, @Text, @CreatedDate)",
            message);

            return result > 0;
        }
        public async Task<IEnumerable<MessageModel>> GetAllMessagesAsync()
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            return await connection.QueryAsync<MessageModel>("SELECT * FROM messages");
        }
        public async Task<MessageModel?> GetMessageAsync(int id)
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            return await connection.QuerySingleOrDefaultAsync<MessageModel>(
                @"SELECT * FROM messages WHERE Id = @Id LIMIT 1", new { Id = id });
        }
    }
}
