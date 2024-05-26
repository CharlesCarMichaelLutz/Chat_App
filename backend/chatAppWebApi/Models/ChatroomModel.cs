
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
        public string UserName { get; set; }
        //public string PasswordHash { get; set; }
        public DateTime CreatedDate { get; set; }
    }
    public class MessageModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Text { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
