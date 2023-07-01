using chatAppWebApi.Models;
using System.Reflection.Metadata.Ecma335;

namespace chatAppWebApi.Services
{
    public class ChatroomService : IChatroomService
    {
        private readonly HttpClient _httpClient;
        private readonly ChatroomModel _chatroomModel;
        public ChatroomService(HttpClient httpClient, ChatroomModel chatroomModel) 
        { 
            _httpClient = httpClient;
            _chatroomModel = chatroomModel;
        }

        //Mock Repository created for initial testing
        public class ChatroomRepository
        {
            private static List<UserModel> _chatroom = new List<UserModel>()
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
        public async Task<IEnumerable<ChatroomRepository>> GetAllMessages()
        {
            var allMessages = new List<ChatroomRepository>();

            //foreach(var data in _chatroom)
            //{
            //    foreach(var messages in data) 
            //    { 
            //        foreach(var text in messages)
            //        {
            //            allMessages.Add(messages);
            //        }
            //    }
            //}


            return allMessages;
        }
    }
}
