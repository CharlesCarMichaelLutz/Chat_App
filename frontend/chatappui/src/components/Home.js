import React, { useState } from "react"
import rabbit from "../App"
import LoginForm from "./LoginForm"

function Home() {
  const [loggedin, setIsloggedIn] = useState(false)
  return (
    <>
      <div className="Home--container">
        <header className="Home--header">
          <img src={rabbit} alt={"rabbit image"} className="Home--logo" />
          <h1 className="Home--title">Rabbit Chat</h1>
        </header>

        <main>
          <LoginForm />
        </main>
      </div>
    </>
  )
}

export default Home
