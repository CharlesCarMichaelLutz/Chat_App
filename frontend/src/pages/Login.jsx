import rabbitImage from "../images/rabbitchat.jpg";
import { useState } from "react";
import useChat from "../hooks/useChat";

const Login = () => {
  const { guestLogin, refresh } = useChat();
  const [isSignUp, setIsSignUp] = useState(true);

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuestSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      username: import.meta.env.VITE_GUEST,
      password: import.meta.env.VITE_PASSWORD,
    };
    guestLogin(credentials);
    clearInput();
  };

  //const handleLoginSubmit = (e) => {}

  //const handleRegisterSubmit = (e) => {}

  const clearInput = () => {
    setInput({ username: "", password: "" });
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
          <button onClick={() => refresh()}>refresh</button>
          {isSignUp ? (
            <form className="login-form">
              <h3 className="login-text">Create Account</h3>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={input.username}
                  onChange={handleChange}
                  placeholder="...enter username"
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={input.password}
                  onChange={handleChange}
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
            <form className="login-form">
              <h3 className="login-text">Login</h3>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={input.username}
                  onChange={handleChange}
                  placeholder="...enter username"
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={input.password}
                  onChange={handleChange}
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

export default Login;
