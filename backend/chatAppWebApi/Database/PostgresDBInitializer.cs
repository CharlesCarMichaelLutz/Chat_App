using Dapper;

namespace chatAppWebApi.Database;
public class PostgresDBInitializer
{
    private readonly IPostgreSqlConnectionFactory _connectionFactory;
    public PostgresDBInitializer(IPostgreSqlConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }
    public async Task InitializeAsync()
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        await connection.ExecuteAsync(@"
                CREATE TABLE IF NOT EXISTS users (
                        Id SERIAL PRIMARY KEY, 
                        Username VARCHAR(100) NOT NULL,
                        PasswordHash VARCHAR(255) NOT NULL,
                        CreatedDate TIMESTAMP NOT NULL
                    );

                CREATE TABLE IF NOT EXISTS messages (
                    Id SERIAL PRIMARY KEY,
                    UserId INTEGER NOT NULL,
                    Text TEXT NOT NULL,
                    CreatedDate Timestamp NOT NULL,

                    CONSTRAINT FK_messages_users FOREIGN KEY (UserId)
                        REFERENCES users(Id)
                    );

             ");
    }
}
