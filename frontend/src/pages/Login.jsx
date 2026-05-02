import RabbitImage from "../components/RabbitImage";
import GuestLoginForm from "../components/GuestLoginForm";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import ToggleLoginFormButton from "../components/ToggleLoginFormButton";
import useLoginForm from "../hooks/useLoginForm";

export const Login = () => {
  const {
    handleGuestSubmit,
    isSignUp,
    handleRegisterSubmit,
    username,
    password,
    handleUsername,
    handlePassword,
    userErrors,
    passErrors,
    handleLoginSubmit,
    toggleSignUp,
  } = useLoginForm();

  return (
    <>
      <div className="login-wrapper">
        <div className="login-left">
          <RabbitImage />
        </div>
        <div className="login-right">
          <div className="form-container">
            <GuestLoginForm handleGuestSubmit={handleGuestSubmit} />
            {isSignUp ? (
              <RegisterForm
                handleRegisterSubmit={handleRegisterSubmit}
                username={username}
                password={password}
                handleUsername={handleUsername}
                handlePassword={handlePassword}
                userErrors={userErrors}
                passErrors={passErrors}
              />
            ) : (
              <LoginForm
                handleLoginSubmit={handleLoginSubmit}
                username={username}
                password={password}
                handleUsername={handleUsername}
                handlePassword={handlePassword}
                userErrors={userErrors}
              />
            )}
            <ToggleLoginFormButton
              toggleSignUp={toggleSignUp}
              isSignUp={isSignUp}
            />
          </div>
        </div>
      </div>
    </>
  );
};
