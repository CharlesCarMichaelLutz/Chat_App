//import React from "react";
import { useState } from "react"
import axios from "axios"
import { endpoints } from "./Endpoints"

function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  //Will return an object that needs to get saved in state

  async function handleLogin() {
    console.log(endpoints.BASE_URI + `users/login`)
    try {
      const res = await axios.post(endpoints.BASE_URI + `users/login`, {
        Username: username,
        PasswordHash: password,
      })
      alert("successfully logged in")
      //This is the JWT token
      console.log(res.data.value)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
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
      <button onClick={handleLogin} className="login--button">
        Log In
      </button>
    </>
  )
}

export default LoginForm
