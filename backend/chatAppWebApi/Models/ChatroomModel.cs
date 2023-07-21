using Newtonsoft.Json;

namespace chatAppWebApi.Models
{
    [Serializable]
    public class ChatroomModel
    {
        public ChatroomData[] ChatroomData { get; set; }
    }
    public class ChatroomData
    {
        public UserModel[] UserModel { get; set; }
        public MessageModel[] MessageModel { get; set; }
        
    }
    public class UserModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
    }
    public class MessageModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Message { get; set; }
    }
}
