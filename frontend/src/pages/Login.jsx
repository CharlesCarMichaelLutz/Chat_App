import rabbitImage from "../images/rabbitchat.jpg";
import { useState } from "react";

export function Login() {
  const [isSignUp, setIsSignUp] = useState(true);

  function toggleSignUp() {
    setIsSignUp((prev) => !prev);
  }

  return (
    <>
      <main className="login-wrapper">
        <img src={rabbitImage} alt="Rabbit Chat Logo" />
        <section className="form-container">
          <form className="login-form">
            <h3 className="login-text">Visit as guest</h3>
            <button type="submit">Enter</button>
          </form>
          {isSignUp ? (
            <form className="login-form">
              <h3 className="login-text">Create Account</h3>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="...enter username"
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
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
                  placeholder="...enter username"
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
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
}
