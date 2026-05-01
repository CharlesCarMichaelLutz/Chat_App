import RabbitImage from "../components/RabbitImage";
import { useState } from "react";
import { useChat } from "../hooks/useChat";
import { useNavigate } from "react-router-dom";
import { baseApi } from "../api/base";
import GuestLoginForm from "../components/GuestLoginForm";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import ToggleLoginFormButton from "../components/ToggleLoginFormButton";

export const Login = () => {
  const { setAuth, setIsLoggedIn } = useChat();
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userErrors, setUserErrors] = useState([]);
  const [passErrors, setPassErrors] = useState([]);
  const navigate = useNavigate();

  const handleUsername = (e) => {
    let usernameInput = e.target.value;
    setUsername(usernameInput);
  };

  const handlePassword = (e) => {
    let passwordInput = e.target.value;
    setPassword(passwordInput);
  };

  const handleGuestSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await baseApi.post("login", {
        Username: import.meta.env.VITE_GUEST,
        Password: import.meta.env.VITE_PASSWORD,
      });

      setAuth(response.data);
      setIsLoggedIn(true);

      if (response.status == 200) {
        navigate("/chatroom");
      }
      clearInput();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setUserErrors([]);
    try {
      const response = await baseApi.post("login", {
        Username: username,
        Password: password,
      });

      setAuth(response.data);
      setIsLoggedIn(true);

      if (response.status == 200) {
        navigate("/chatroom");
      }
      clearInput();
    } catch (error) {
      console.log("response: ", error.response);
      console.log("data: ", error.response.data);
      if (error.status === 400) {
        setUserErrors((prevErr) => [...prevErr, error.response.data]);
      }
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setUserErrors([]);
    setPassErrors([]);
    try {
      const response = await baseApi.post("signup", {
        Username: username,
        Password: password,
      });
      setAuth(response.data);
      setIsLoggedIn(true);

      if (response.status == 200) {
        navigate("/chatroom");
      }
      clearInput();
    } catch (error) {
      if (error.response.status === 400) {
        const errorData = error.response?.data;
        setUserErrors(errorData?.usernameErrors ?? []);
        setPassErrors(errorData?.passwordErrors ?? []);
      } else if (error.response.status === 404) {
        setUserErrors((prevErr) => [...prevErr, error.response.data]);
      }
    }
  };

  const clearInput = () => {
    setUsername("");
    setPassword("");
  };

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
    setUserErrors([]);
    setPassErrors([]);
    clearInput();
  };

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
