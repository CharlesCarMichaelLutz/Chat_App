namespace chatAppWebApi.Domain;
public class RefreshToken
{
    public int Id { get; set; }
    public string Token { get; set; }
    public int UserId { get; set; }
    public DateTime ExpiresOnUtc { get; set; }
    public bool IsExpired { get; set; }
}
