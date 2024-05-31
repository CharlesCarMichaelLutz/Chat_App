import React from "react";
import rabbit from "../App";
import { useState } from "react";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);

  return (
    <>
      <div className="landingPage--container">
        <header className="landingPage--header">
          <img src={rabbit} className="landingPage--logo" />
          <h1 className="landingPage--title">Rabbit Chat</h1>
        </header>

        <main className="landingPage--main">
          <form className="landingPage--links">
            <h2 htmlFor="guest--button">View as guest</h2>
            <button className="guest--button">Guest</button>

            <h2 className="createaccount--button">Create an account</h2>
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              className="username--input"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="password--input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="createaccount-button">Sign Up</button>

            <h2>Already have an account?</h2>

            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              className="username--input"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="password--input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login--button">Log In</button>
          </form>
        </main>
      </div>
    </>
  );
}

export default Home;
