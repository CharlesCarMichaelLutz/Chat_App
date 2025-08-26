using chatAppWebApi.Database;
using chatAppWebApi.Models;
using Dapper;

namespace chatAppWebApi.Repositories
{
    public interface IUserRepository
    {
        Task<bool> CreateUserAsync(UserModel user);
        Task<IEnumerable<UserDTO>> GetAllUsersAsync();
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

            var query = @"INSERT INTO users (Username, PasswordHash, CreatedDate)
                VALUES (@Username, @PasswordHash, @CreatedDate)";

            var result = await connection.ExecuteAsync(query,user);

            return result > 0;
        }
        public async Task<IEnumerable<UserDTO>> GetAllUsersAsync()
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            var query = @"SELECT Id AS UserId, Username FROM users";

            return await connection.QueryAsync<UserDTO>(query);
        }
        public async Task<UserModel> GetUsernameAsync(UserModel user)
        {
            using var connection = await _connectionFactory.CreateConnectionAsync();

            var query = @"SELECT * FROM users WHERE Username = @UserName";

            return await connection.QuerySingleOrDefaultAsync<UserModel>(query, user);
        }
    }
}
