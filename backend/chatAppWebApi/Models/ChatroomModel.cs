
namespace chatAppWebApi.Models
{
    public class ChatroomModel
    {
        public List<UserModel>  Users { get; set; }
        public List<MessageModel>  Messages { get; set; }
    }
    public class UserModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public DateTime CreatedDate { get; set; }
    }
    public class MessageModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Text { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class JwtCredentials
    {
        public string Key { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }

    }

    public class LoginResponse
    {
        public int UserId { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
    }
}
