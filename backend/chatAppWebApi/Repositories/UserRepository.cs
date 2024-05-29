using chatAppWebApi.Database;
using chatAppWebApi.Models;
using Dapper;

namespace chatAppWebApi.Repositories
{
    public interface IUserRepository
    {
        Task<bool> CreateUserAsync(UserModel user);
        Task<IEnumerable<UserModel>> GetAllUsersAsync();
        Task<UserModel> GetUsernameAsync(UserModel user);
    }

    public class UserRepository : IUserRepository
    {
        private readonly IPostgreSqlConnectionFactory _connectionFactory;
        public UserRepository(IPostgreSqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }
        public async Task<bool> CreateUserAsync(UserModel user)
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            var result = await connection.ExecuteAsync(
                @"INSERT INTO users (Username, PasswordHash, CreatedDate)
                VALUES (@Username, @PasswordHash @CreatedDate)",
                user);

            return result > 0;
        }
        public async Task<IEnumerable<UserModel>> GetAllUsersAsync()
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            return await connection.QueryAsync<UserModel>(@"SELECT * FROM users");
        }
        public async Task<UserModel> GetUsernameAsync(UserModel user)
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            return await connection.QuerySingleOrDefaultAsync<UserModel>(@"SELECT * FROM users WHERE Username = @UserName", user);
        }
    }
}
