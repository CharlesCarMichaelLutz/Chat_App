namespace chatAppWebApi.Domain;
public class Message
{
    public int UserId { get; set; }
    public string Text { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedDate { get; set; }
}
