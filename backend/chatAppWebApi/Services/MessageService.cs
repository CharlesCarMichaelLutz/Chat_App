using chatAppWebApi.Contracts.Requests;
using chatAppWebApi.Contracts.Responses;
using chatAppWebApi.Domain;
using chatAppWebApi.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace chatAppWebApi.Services;
public interface IMessageService
{
    Task<MessageResponse> SaveMessage(MessageRequest request);
    Task<IEnumerable<MessageResponse>> GetAllMessages();
    Task<MessageResponse> DeleteMessage(DeleteRequest request);
}
public class MessageService : IMessageService
{
    private readonly IMessageRepository _messageRepository;
    public MessageService(IMessageRepository messageRepository)
    {
        _messageRepository = messageRepository;
    }
    public async Task<MessageResponse> SaveMessage(MessageRequest request)
    {
        var message = new Message
        {
            UserId = request.UserId,
            Text = request.Text,
            IsDeleted = false,
            CreatedDate = DateTime.UtcNow,
        };

        return await _messageRepository.SaveAndGetMessage(message);
    }
    public async Task<IEnumerable<MessageResponse>> GetAllMessages()
    {
        var messageList = await _messageRepository.GetAllMessagesAsync();

        return messageList.Select(m => new MessageResponse
        { 
            Id = m.Id,
            UserId = m.UserId,
            Text = m.Text,
            IsDeleted = m.IsDeleted,
            CreatedDate = m.CreatedDate
        });
    }
    public async Task<MessageResponse> DeleteMessage(DeleteRequest request)
    {
        return await _messageRepository.DeleteMessageAsync(request);
    }
}

