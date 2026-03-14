using chatAppWebApi.Contracts.Requests;
using chatAppWebApi.Contracts.Responses;
using chatAppWebApi.Database;
using chatAppWebApi.Domain;
using Dapper;

namespace chatAppWebApi.Repositories;
public interface IMessageRepository
{
    Task<MessageResponse> SaveAndGetMessage(Message message);
    Task<IEnumerable<MessageResponse>> GetAllMessagesAsync();
    Task<MessageResponse> DeleteMessageAsync(DeleteRequest request);
}
public class MessageRepository : IMessageRepository
{
    private readonly IPostgreSqlConnectionFactory _connectionFactory;
    public MessageRepository(IPostgreSqlConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }
    public async Task<MessageResponse> SaveAndGetMessage(Message message)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        //const string sql =
        //    """
        //    INSERT INTO messages
        //        (UserId, Text, CreatedDate, IsDeleted)
        //    VALUES
        //        (@UserId, @Text, @CreatedDate, @IsDeleted)
        //    RETURNING
        //        Id, UserId, Text, CreatedDate, IsDeleted
        //    """;
        const string sql =
            """
            WITH inserted_row AS (
                INSERT INTO messages
                    (UserId, Text, CreatedDate, IsDeleted)
                VALUES
                    (@UserId, @Text, @CreatedDate, @IsDeleted)
                RETURNING
                    Id, UserId, Text, CreatedDate, IsDeleted
                )
                SELECT i.id, i.userid, i.text, i.createddate, i.isdeleted, u.username
                FROM inserted_row i
                JOIN users u ON u.id = i.userid
            """;

        return await connection.QuerySingleAsync<MessageResponse>(sql, message);
    }
    public async Task<IEnumerable<MessageResponse>> GetAllMessagesAsync()
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
            SELECT m.id, m.userid, m.text, m.createddate, m.isdeleted, u.username
            FROM messages m
            JOIN users u
            	ON u.id = m.userid
            ORDER BY ID ASC;
            """;

        return await connection.QueryAsync<MessageResponse>(sql);
    }
    public async Task<MessageResponse> DeleteMessageAsync(DeleteRequest request)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
            UPDATE messages
            SET isdeleted = @IsDeleted
            WHERE id = @Id
            RETURNING *
            """;

        return await connection.QuerySingleAsync<MessageResponse>(sql, request);
    }
}

