import rabbit from "../images/rabbitchat.jpg";
import { useAuth } from "../components/AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseApi } from "../api/base";
import {
  checkUsername,
  checkPassword,
  renderLoginErrors,
} from "../helpers/validators";
import GuestForm from "../components/GuestForm";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";

export function LoginPage() {
  const { isSignUp, toggleSignUp, setUser } = useAuth();
  const navigate = useNavigate();

  const [usernameErrors, setUsernameErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function clearInput() {
    setCredentials({ username: "", password: "" });
  }

  async function signupRequest(data) {
    const { username, password } = data;

    try {
      const res = await baseApi.post(`users/signup`, {
        Username: username,
        PasswordHash: password,
      });

      setUser(res.data);
    } catch (error) {
      console.log("error:", error);
    } finally {
      clearInput();
      navigate("/chatroom");
    }
  }

  async function loginRequest(data) {
    const { username, password } = data;

    try {
      const res = await baseApi.post(`users/login`, {
        Username: username,
        PasswordHash: password,
      });

      setUser(res.data.value);
    } catch (error) {
      handleLoginError(error.response.status);
    } finally {
      clearInput();
      navigate("/chatroom");
    }
  }

  function guestSubmit(e) {
    e.preventDefault();
    const guestCredentials = {
      username: import.meta.env.VITE_GUEST_USER,
      password: import.meta.env.VITE_GUEST_PASSWORD,
    };
    loginRequest(guestCredentials);
  }

  async function signupSubmit() {
    const { username, password } = credentials;

    const usernameResults = checkUsername(username);
    const passwordresults = checkPassword(password);

    setUsernameErrors(usernameResults);
    setPasswordErrors(passwordresults);

    if (usernameErrors.length === 0 && passwordErrors.length === 0) {
      signupRequest(credentials);
    }
  }

  function handleLoginError(response) {
    const results = renderLoginErrors(response);
    setPasswordErrors(results);
  }

  return (
    <>
      <img src={rabbit} alt="rabbit chat image" />
      <div className="login-container">
        <GuestForm guestSubmit={guestSubmit} />

        {isSignUp ? (
          //SIGN UP
          <SignupForm
            signupSubmit={signupSubmit}
            usernameErrors={usernameErrors}
            credentials={credentials}
            handleChange={handleChange}
            passwordErrors={passwordErrors}
          />
        ) : (
          //LOGIN
          <LoginForm
            loginRequest={loginRequest}
            credentials={credentials}
            handleChange={handleChange}
            passwordErrors={passwordErrors}
          />
        )}
      </div>
      <button className="switch-submit" onClick={toggleSignUp}>
        {isSignUp ? `Switch to Login` : `Switch to Sign Up`}
      </button>
    </>
  );
}
