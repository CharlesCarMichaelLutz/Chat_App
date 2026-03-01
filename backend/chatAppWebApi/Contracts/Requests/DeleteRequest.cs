namespace chatAppWebApi.Contracts.Requests;

public class DeleteRequest
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public bool IsDeleted { get; set; }
}
