namespace chatAppWebApi.Contracts.Requests;
public class RefreshTokenRequest
{
    public int UserId { get; set; }
    public string Username { get; set; }
    public string RefreshToken { get; set; }
    public bool IsExpired { get; set; }
}
