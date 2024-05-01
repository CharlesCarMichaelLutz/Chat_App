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
            //Console.WriteLine("Successful connection to DB");

            //using (var command = new NpgsqlCommand("SELECT CURRENT_TIMESTAMP", connection))
            //{
            //    var result = await command.ExecuteScalarAsync();
            //    Console.WriteLine($"Current timestamp from DB: {result}");
            //}
        }
        catch (Exception ex) 
        {
            Console.WriteLine($"Could not connect to DB: {ex.Message}");
        }
        return connection;
    }
}
