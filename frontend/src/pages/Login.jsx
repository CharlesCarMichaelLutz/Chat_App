import rabbitImage from "../images/rabbitchat.jpg";
import { useState } from "react";
import { useChat } from "../hooks/useChat";

export const Login = () => {
  const { userLogin, userRegister } = useChat();
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    let usernameInput = e.target.value;
    setUsername(usernameInput);
  };

  const handlePassword = (e) => {
    let passwordInput = e.target.value;
    setPassword(passwordInput);
  };

  //guest
  const handleGuestSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      username: import.meta.env.VITE_GUEST,
      password: import.meta.env.VITE_PASSWORD,
    };
    userLogin(credentials);
    clearInput();
  };

  //login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      username: username,
      password: password,
    };
    userLogin(credentials);
    clearInput();
  };

  //register
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      username: username,
      password: password,
    };
    userRegister(credentials);
    clearInput();
  };

  const clearInput = () => {
    setUsername("");
    setPassword("");
  };

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
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
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePassword}
                  placeholder="...enter password"
                  required
                />
              </div>
              <button type="submit">Sign Up</button>
              <button onClick={toggleSignUp} className="toggle-login">
                {isSignUp
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </button>
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
              </div>
              <button type="submit">Login</button>
              <button onClick={toggleSignUp} className="toggle-login">
                {isSignUp
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </button>
            </form>
          )}
        </section>
      </main>
    </>
  );
};
