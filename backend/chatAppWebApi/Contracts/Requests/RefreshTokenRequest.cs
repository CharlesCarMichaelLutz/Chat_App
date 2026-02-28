namespace chatAppWebApi.Contracts.Requests;
public class RefreshTokenRequest
{
    public int UserId { get; set; }
    public string Username { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
}
