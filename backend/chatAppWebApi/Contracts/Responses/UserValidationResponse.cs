namespace chatAppWebApi.Contracts.Responses;
public class UserValidationResponse
{
    public bool IsValid { get; set; }
    //public string[] UsernameErrors { get; set; }
    //public string[] PasswordErrors { get; set; }
    //public IEnumerable<string>? UsernameErrors { get; set; }
    //public IEnumerable<string>? PasswordErrors { get; set; }
    public List<string>? UsernameErrors { get; set; }
    public List<string>? PasswordErrors { get; set; }
}
