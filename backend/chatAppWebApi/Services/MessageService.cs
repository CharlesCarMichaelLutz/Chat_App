using chatAppWebApi.Models;
using chatAppWebApi.Repositories;
using chatAppWebApi.SignalR;
using Microsoft.AspNetCore.SignalR;

namespace chatAppWebApi.Services
{
    public interface IMessageService
    {
        Task<bool> CreateMessage(MessageModel message);
        Task<IEnumerable<MessageModel>> GetAllMessages();
        Task<MessageModel?> GetMessage(int id);
    }
    public class MessageService : IMessageService
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IHubContext<ChatHub> _hubContext;
        public MessageService(IMessageRepository messageRepository, IHubContext<ChatHub> hubContext) 
        {
            _messageRepository = messageRepository;
            _hubContext = hubContext;
        }
        public async Task<bool> CreateMessage(MessageModel message)
        {
            try
            {
                var saved = await _messageRepository.CreateMessageAsync(message);
                if (!saved)
                {
                    return false;
                }

                await _hubContext.Clients.All.SendAsync("ReceiveMessage", message.UserId, message.Text);
                return true;

            }
            catch (Exception ex) 
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
        public async Task<IEnumerable<MessageModel>> GetAllMessages()
        {
            return await _messageRepository.GetAllMessagesAsync();
        }

        public async Task<MessageModel?> GetMessage(int id)
        {
            return await _messageRepository.GetMessageAsync(id);
        }
    }
}
