import rabbitImage from "../images/rabbitchat.jpg";
import { useState } from "react";
import { useChat } from "../hooks/useChat";
import { useNavigate } from "react-router-dom";
import { baseApi } from "../api/base";

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
    clearInput();
  };

  return (
    <>
      <main className="login-wrapper">
        <img src={rabbitImage} alt="Rabbit Chat Logo" />
        <section className="form-container">
          <form className="login-form" onSubmit={handleGuestSubmit}>
            <h3 className="login-text">Visit as guest</h3>
            <button type="submit">Enter</button>
          </form>
          {isSignUp ? (
            <form className="login-form" onSubmit={handleRegisterSubmit}>
              <h3 className="login-text">Create Account</h3>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsername}
                  placeholder="...enter username"
                  required
                />
                {userErrors.length > 0 && (
                  <div>{`Must: ${userErrors.join(", ")}`}</div>
                )}
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePassword}
                  placeholder="...enter password"
                  required
                />
                {passErrors.length > 0 && (
                  <div>{`Must: ${passErrors.join(", ")}`}</div>
                )}
              </div>
              <button type="submit">Sign Up</button>
            </form>
          ) : (
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <h3 className="login-text">Login</h3>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsername}
                  placeholder="...enter username"
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePassword}
                  placeholder="...enter password"
                  required
                />
                {userErrors.length > 0 && <div>{userErrors}</div>}
              </div>
              <button type="submit">Login</button>
            </form>
          )}
          <button onClick={toggleSignUp} className="toggle-login">
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </section>
      </main>
    </>
  );
};
