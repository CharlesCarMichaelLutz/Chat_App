using chatAppWebApi.Models;
using chatAppWebApi.Repositories;

namespace chatAppWebApi.Services
{
    public interface IMessageService
    {
        Task<bool> CreateMessage(MessageModel message);
        Task<IEnumerable<MessageModel>> GetAllMessages();
    }
    public class MessageService : IMessageService
    {
        private readonly IMessageRepository _messageRepository;
        public MessageService(IMessageRepository messageRepository) 
        {
            _messageRepository = messageRepository;
        }
        public async Task<bool> CreateMessage(MessageModel message)
        {
            return await _messageRepository.CreateMessageAsync(message);
        }
        public async Task<IEnumerable<MessageModel>> GetAllMessages()
        {
            return await _messageRepository.GetAllMessagesAsync();
        }
    }
}
