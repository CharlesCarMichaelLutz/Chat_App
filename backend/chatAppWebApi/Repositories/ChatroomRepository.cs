using chatAppWebApi.Models;

namespace chatAppWebApi.Repositories
{
    //Mock Repository created for initial testing
    public class ChatroomRepository
    {
        public static List<UserModel> _chatroom = new List<UserModel>()
            {
                new UserModel()
                { UserName = "User A",
                    MessageModel = new MessageModel[]
                    {
                        new MessageModel { Message = "Greetings everyone!"}
                    }
                },
                new UserModel()
                { UserName = "User B",
                    MessageModel = new MessageModel[]
                    {
                        new MessageModel { Message = "Welcome User A!"},
                        new MessageModel { Message = "I would like to visit the beach soon"},
                        new MessageModel { Message = "And I won't forget to bring sunscreen"}
                    }
                },
                 new UserModel()
                { UserName = "User C",
                    MessageModel = new MessageModel[]
                    {
                        new MessageModel { Message = "I am looking forward to a good one"}
                    }
                },
                 new UserModel()
                { UserName = "User D",
                    MessageModel = new MessageModel[]
                    {
                        new MessageModel { Message = "Let's have a great summer"},
                        new MessageModel { Message = "That's agreed User B"}
                    }
                }
            };
    }
}
