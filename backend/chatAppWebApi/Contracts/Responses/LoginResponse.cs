namespace chatAppWebApi.Contracts.Responses;
public class LoginResponse
{
    public int UserId { get; set; }
    public string Username { get; set; }
    public string Token { get; set; }
}
