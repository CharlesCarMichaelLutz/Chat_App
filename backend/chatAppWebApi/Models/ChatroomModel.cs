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
        public DateTime CreatedDate { get; set; }
    }
    public class MessageModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Text { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
