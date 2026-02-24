namespace chatAppWebApi.Contracts.Responses;
public class MessageResponse
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Text { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedDate { get; set; }
}
