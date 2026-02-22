using chatAppWebApi.Models;
using chatAppWebApi.Repositories;

namespace chatAppWebApi.Services;
public interface IMessageService
{
    Task<bool> CreateMessage(MessageModel message);
    Task<IEnumerable<MessageModel>> GetAllMessages();
    Task<bool> DeleteMessage(int id);
    Task<MessageDTO> GetMessage();
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
            var saved = await _messageRepository.CreateMessageAsync(message);

            if (saved)
            {
                return true;
            }
            return false;
    }
    public async Task<MessageDTO> GetMessage()
    {
            var saved = await _messageRepository.GetMessageAsync();

            return new MessageDTO
            {
                MessageId = saved.MessageId,
                UserId = saved.UserId,
                Text = saved.Text,
            };
    }
    //public async Task<IEnumerable<MessageModel>> GetAllMessages()
    //{
    //    return await _messageRepository.GetAllMessagesAsync();
    //}
    public async Task<IEnumerable<MessageModel>> GetAllMessages()
    {
        var messageList = await _messageRepository.GetAllMessagesAsync();

        return messageList.Select(m => new MessageModel
        {
            Id = m.MessageId,
            UserId = m.UserId,
            Text = m.Text
        });
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

