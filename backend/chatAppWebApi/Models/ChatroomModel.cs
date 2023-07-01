namespace chatAppWebApi.Models
{
    public class ChatroomModel
    {
        public ChatroomData[] ChatroomData { get; set; }
    }

    public class ChatroomData
    {
        public UserModel[] UserModel { get; set; }
    }
    public class UserModel
    {
        public string UserName { get; set; }
        public MessageModel[] MessageModel { get; set; }
    }

    public class MessageModel
    {
        public string Message { get; set; }
    }
}
