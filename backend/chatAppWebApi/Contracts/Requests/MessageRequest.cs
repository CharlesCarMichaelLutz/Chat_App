namespace chatAppWebApi.Contracts.Requests;
public class MessageRequest
{
    public int UserId { get; set; }
    public string Text { get; set; }
}
