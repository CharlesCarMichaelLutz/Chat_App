using chatAppWebApi.Contracts.Requests;
using chatAppWebApi.Contracts.Responses;
using chatAppWebApi.Database;
using chatAppWebApi.Domain;
using Dapper;

namespace chatAppWebApi.Repositories;
public interface IUserRepository
{
    Task<bool> CreateUserAsync(User user);
    Task<IEnumerable<UserResponse>> GetAllUsersAsync();
    Task<User> GetUsernameAsync(UserRequest request);
    Task<bool> SaveRefreshToken(RefreshToken token);
    Task<RefreshToken> CheckAndInvalidateToken(RefreshTokenRequest request);
}
public class UserRepository : IUserRepository
{
    private readonly IPostgreSqlConnectionFactory _connectionFactory;
    public UserRepository(IPostgreSqlConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }
    public async Task<bool> CreateUserAsync(User user)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
            INSERT INTO users 
                (Username, PasswordHash, CreatedDate)
            VALUES 
                (@Username, @PasswordHash, @CreatedDate)
            """;

        var result = await connection.ExecuteAsync(sql, user);

        return result > 0;
    }
    public async Task<IEnumerable<UserResponse>> GetAllUsersAsync()
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
            SELECT Id AS UserId, Username FROM users
            """;

        return await connection.QueryAsync<UserResponse>(sql);
    }
    public async Task<User> GetUsernameAsync(UserRequest request)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
            SELECT * FROM users WHERE Username = @UserName
            """;

        return await connection.QuerySingleOrDefaultAsync<User>(sql, request);
    }
    public async Task<bool> SaveRefreshToken(RefreshToken token)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
            INSERT INTO tokens
                (Token, UserId, ExpiresOnUtc, IsExpired)
            VALUES
                (@Token, @UserId, @ExpiresOnUtc, @IsExpired)
            """;
        var result = await connection.ExecuteAsync(sql, token);

        return result > 0;
    }
    public async Task<RefreshToken> CheckAndInvalidateToken(RefreshTokenRequest request)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
             """
            UPDATE tokens
            SET isexpired = @IsExpired
            WHERE UserId = @UserId, Token = @Token
            RETURNING *
            """;
        return await connection.QuerySingleOrDefaultAsync<RefreshToken>(sql, request);
    }
}
