import React from "react";
import rabbit from "../App";
//import { useState } from "react";
import CreateAccountForm from "./CreateAccountForm";
import LoginForm from "./LoginForm";

function Home() {
  //const [user, setUser] = useState([]);

  return (
    <>
      <div className="landingPage--container">
        <header className="landingPage--header">
          <img
            src={rabbit}
            alt={"rabbit image"}
            className="landingPage--logo"
          />
          <h1 className="landingPage--title">Rabbit Chat</h1>
        </header>

        <main className="landingPage--main">
          <h2 htmlFor="guest--button">View as guest</h2>
          <button className="guest--button">Guest</button>

          <CreateAccountForm />
          <LoginForm />
        </main>
      </div>
    </>
  );
}

export default Home;
