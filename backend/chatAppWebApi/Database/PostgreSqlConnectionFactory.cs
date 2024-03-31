using System.Data;
using Npgsql;

namespace chatAppWebApi.Database;

public interface IPostgreSqlConnectionFactory
{
    Task<IDbConnection> CreateConnectionAsync();
}

public class PostgreSqlConnectionFactory : IPostgreSqlConnectionFactory
{
    private readonly string _connectionString;

    public PostgreSqlConnectionFactory(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<IDbConnection> CreateConnectionAsync()
    {
        var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();
        return connection;
    }
}
