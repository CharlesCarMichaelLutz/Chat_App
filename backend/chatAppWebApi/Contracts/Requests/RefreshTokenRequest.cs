namespace chatAppWebApi.Contracts.Requests;
public class RefreshTokenRequest
{
    public string? Token { get; set; }
    public bool IsExpired { get; set; }
}
