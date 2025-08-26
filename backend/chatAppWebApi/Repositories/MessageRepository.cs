using chatAppWebApi.Database;
using chatAppWebApi.Models;
using Dapper;

namespace chatAppWebApi.Repositories
{
    public interface IMessageRepository
    {
        Task<bool> CreateMessageAsync(MessageModel message);
        //Task<IEnumerable<MessageModel>> GetAllMessagesAsync();
        Task<IEnumerable<MessageDTO>> GetAllMessagesAsync();
        Task<bool> DeleteMessageAsync(int id);
        Task<MessageDTO> GetMessageAsync();
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

            var query = @"INSERT INTO messages (UserId, Text, CreatedDate) 
                VALUES (@UserId, @Text, @CreatedDate)";

            var result = await connection.ExecuteAsync(query,message);

            return result > 0;
        }

        public async Task<MessageDTO> GetMessageAsync()
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            var query = @"SELECT Id AS MessageId, UserId, Text FROM messages 
                ORDER BY ID DESC LIMIT 1;";

            var response = await connection.QuerySingleAsync<MessageDTO>(query);

            return response;
        }
        //public async Task<IEnumerable<MessageModel>> GetAllMessagesAsync()
        //{
        //    using var connection = await _connectionFactory.CreateConnectionAsync();

        //    var query = "SELECT * FROM messages ORDER BY ID ASC";

        //    var response = await connection.QueryAsync<MessageModel>(query);

        //    return response;
        //}

        public async Task<IEnumerable<MessageDTO>> GetAllMessagesAsync()
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            //var query = "SELECT * FROM messages ORDER BY ID ASC";
            var query = "SELECT Id AS MessageId, UserId, Text FROM messages ORDER BY ID ASC";

            //var response = await connection.QueryAsync<MessageDTO>(query);

            return await connection.QueryAsync<MessageDTO>(query);

        }
        public async Task<bool> DeleteMessageAsync(int id)
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            var query = @"DELETE FROM messages WHERE Id = @Id";

            var result = await connection.ExecuteAsync(query, new { Id = id});

            return result > 0;
        }
    }
}

