//import React from "react";
import { useState } from "react"
import axios from "axios"
import { endpoints } from "./Endpoints"

function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignup] = useState(true)

  //Will return an object that needs to get saved in state

  async function handleLogin() {
    const path = isSignUp ? `users/signup` : `users/login`
    const url = endpoints.BASE_URI + path
    console.log(url)
    try {
      const res = await axios.post(url, {
        Username: username,
        PasswordHash: password,
      })

      if (isSignUp) {
        alert("created account success!")
      } else {
        alert("logged in success!")
        //This is the JWT token
        console.log(res.data.value)
        //Save the JWT in local storage
      }
    } catch (error) {
      console.error(error)
    } finally {
      setUsername("")
      setPassword("")
    }
  }

  return (
    <div className="login--form">
      <h2 htmlFor="guest--button">View as guest</h2>
      <button className="guest--button">Guest</button>

      <h2>{isSignUp ? `Create account` : `Login`}</h2>
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
      <button onClick={handleLogin} className="login--button">
        {isSignUp ? `Sign Up` : `Login`}
      </button>
      <button onClick={() => setIsSignup(!isSignUp)}>
        {isSignUp ? `Switch to Login` : `Switch to Sign Up`}
      </button>
    </div>
  )
}

export default LoginForm
