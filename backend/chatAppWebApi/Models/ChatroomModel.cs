
namespace chatAppWebApi.Models;
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
public class UserDTO
{
    public int UserId { get; set; }
    public string Username { get; set; }
}
public class MessageModel
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Text { get; set; }
    public DateTime CreatedDate { get; set; }
}
public class MessageDTO
{
    public int MessageId { get; set; }
    public int UserId { get; set; }
    public string Text { get; set; }
}
public class DeleteMessageModel
{
    public int Id { get; set; }
    public int UserId { get; set; }
}
