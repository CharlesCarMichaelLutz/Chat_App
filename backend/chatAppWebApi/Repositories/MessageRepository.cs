using chatAppWebApi.Database;
using chatAppWebApi.Models;
using Dapper;

namespace chatAppWebApi.Repositories
{
    public interface IMessageRepository
    {
        Task<bool> CreateMessageAsync(MessageModel message);
        Task<IEnumerable<MessageModel>> GetAllMessagesAsync();
        Task<bool> DeleteMessageAsync(int id);
        Task<MessageModel> GetMessageAsync();

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

        public async Task<MessageModel> GetMessageAsync()
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            var response = await connection.QuerySingleAsync(
            @"SELECT * FROM messages ORDER BY ID DESC LIMIT 1;");

            return response;

        }
        public async Task<IEnumerable<MessageModel>> GetAllMessagesAsync()
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            return await connection.QueryAsync<MessageModel>("SELECT * FROM messages");
        }

        public async Task<bool> DeleteMessageAsync(int id)
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            var deleteSql = @"DELETE FROM messages WHERE Id = @Id";

            var result = await connection.ExecuteAsync(deleteSql, new { Id = id});

            return result > 0;
        }
    }
}

