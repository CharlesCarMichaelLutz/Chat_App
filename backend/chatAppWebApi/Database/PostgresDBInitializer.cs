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
                    id SERIAL PRIMARY KEY, 
                    username VARCHAR(100) NOT NULL,
                    passwordhash VARCHAR(255) NOT NULL,
                    createddate TIMESTAMP NOT NULL
                    );

                CREATE TABLE IF NOT EXISTS messages (
                    id SERIAL PRIMARY KEY,
                    userid INTEGER NOT NULL,
                    text TEXT NOT NULL,
                    isdeleted BOOLEAN NOT NULL,
                    createdcate Timestamp NOT NULL,

                    CONSTRAINT FK_messages_users FOREIGN KEY (userid)
                        REFERENCES users(id)
                    );

                CREATE TABLE IF NOT EXISTS tokens (
                    id SERIAL PRIMARY KEY,
	                token varchar(300) NOT NULL,
	                userid INTEGER NOT NULL,
                    expiresonutc Timestamp NOT NULL,
                    isexpired BOOLEAN NOT NULL,

                CONSTRAINT FK_tokens_users FOREIGN KEY (userid)
                       REFERENCES users(id)
                );
             ");
    }
}
