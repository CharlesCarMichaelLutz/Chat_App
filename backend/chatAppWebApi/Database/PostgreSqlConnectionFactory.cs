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
        try
        {
            await connection.OpenAsync();
        }
        catch (Exception ex) 
        {
            Console.WriteLine($"Could not connect to DB: {ex.Message}");
            throw;
        }
        return connection;
    }
}
