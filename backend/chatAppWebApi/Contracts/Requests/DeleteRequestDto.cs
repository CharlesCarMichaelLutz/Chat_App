namespace chatAppWebApi.Contracts.Requests;

public class DeleteRequestDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public bool IsDeleted { get; set; }
}
