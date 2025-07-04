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
        Task<bool> DeleteMessage(int id);

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
            try
            {
                var saved = await _messageRepository.CreateMessageAsync(message);
                if (!saved)
                {
                    return false;
                }
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
            //TODO reshape the data with a DTO so it omits createdDate

            return await _messageRepository.GetAllMessagesAsync();
        }
        public async Task<bool> DeleteMessage(int id)
        {
            try
            {
                var saved = await _messageRepository.DeleteMessageAsync(id);
                if (!saved)
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }

        }
    }
}

