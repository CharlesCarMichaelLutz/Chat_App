namespace chatAppWebApi.Contracts.Responses;
public class UserValidationResponse
{
    public bool IsValid { get; set; }
    public List<string>? UsernameErrors { get; set; }
    public List<string>? PasswordErrors { get; set; }
}
