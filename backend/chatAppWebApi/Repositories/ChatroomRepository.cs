using chatAppWebApi.Models;

namespace chatAppWebApi.Repositories
{
    //Mock Repository created for initial testing
    public class ChatroomRepository
    {
        public static List<UserModel> _users = new List<UserModel>()
            {
                new UserModel()
                {   
                    Id = 1,
                    UserName = "User A",
                },
                new UserModel()
                {
                    Id = 2,
                    UserName = "User B", 
                },
                 new UserModel()
                {
                    Id = 3,
                    UserName = "User C",
                },
                 new UserModel()
                { 
                    Id = 4,
                    UserName = "User D"
                }
            };

        public static List<MessageModel> _messages = new List<MessageModel>()
            {
                new MessageModel()
                {
                    Id = 1,
                    UserName = "User A",
                    Message = "Greetings everyone!"
                },
                new MessageModel()
                {
                    Id = 2,
                    UserName = "User B",
                    Message = "Welcome User A!"
                },
                new MessageModel()
                {
                    Id = 3,
                    UserName = "User B",
                    Message = "I would like to visit the beach soon"
                },
                new MessageModel()
                {
                    Id = 4,
                    UserName = "User B",
                    Message = "And I won't forget to bring sunscreen"
                },
                 new MessageModel()
                {
                    Id = 5,
                    UserName = "User D",
                    Message = "That's agreed User B"
                },
                new MessageModel()
                {
                    Id = 6,
                    UserName = "User C",
                    Message = "I am looking forward to a good one"
                },
                new MessageModel()
                {
                    Id = 7,
                    UserName = "User D",
                    Message = "Let's have a great summer"
                }
            };
    }
}
