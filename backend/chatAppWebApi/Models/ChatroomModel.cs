namespace chatAppWebApi.Models
{
    public class ChatroomModel
    {
        public ChatroomData[] ChatroomData { get; set; }
    }

    public class ChatroomData
    {
        public string[] Users { get; set; }
    }
    public class Users
    {
        public string UserName { get; set; }
        public string[] Messages { get; set; }
    }

    public class Messages
    {
        public string Text { get; set; }
    }
}
