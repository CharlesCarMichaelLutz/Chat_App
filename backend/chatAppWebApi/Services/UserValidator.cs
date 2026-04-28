namespace chatAppWebApi.Services;
public class UserValidator
{
    public static UserValidationResponse Validate(UserRequest user)
    {
        string username = user.Username;
        string password = user.Password;

        List<string> usernameErrors = CheckCredentials(username);
        List<string> passwordErrors = CheckCredentials(password);

        return new UserValidationResponse
        {
            IsValid = usernameErrors.Count == 0 && passwordErrors.Count == 0 ? true : false,
            UsernameErrors = usernameErrors.Any() ? usernameErrors : null,
            PasswordErrors = passwordErrors.Any() ? passwordErrors : null
        };
    }
    public static List<string> CheckCredentials(string usernameOrPassword)
    {
        var errors = new List<string>();

        string capital = @"[A-Z]";
        string lowerCase = @"[a-z]";
        string singleDigit = @"[0-9]";
        string specialCharacter = @"[^a-zA-Z0-9]";

        if (string.IsNullOrWhiteSpace(usernameOrPassword))
        {
            errors.Add("not be empty");
        }

        if (usernameOrPassword.Length < 12 || usernameOrPassword.Length > 30)
        {
            errors.Add("be between 12 and 30 characters");
        }

        if (!Regex.IsMatch(usernameOrPassword, capital))
        {
            errors.Add("have one uppercase letter");
        }

        if (!Regex.IsMatch(usernameOrPassword, lowerCase))
        {
            errors.Add("have one lowercase letter");
        }

        if (!Regex.IsMatch(usernameOrPassword, singleDigit))
        {
            errors.Add("have one number");
        }

        if (!Regex.IsMatch(usernameOrPassword, specialCharacter))
        {
            errors.Add("have one special character");
        }
        return errors;
    }
}
