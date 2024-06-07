//import React from "react";
import { useState } from "react"
import axios from "axios"
import { endpoints } from "./Endpoints"

function CreateAccountForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function handleCreateAccount() {
    console.log(endpoints.BASE_URI + `users/signup`)
    try {
      const res = await axios.post(endpoints.BASE_URI + `users/signup`, {
        Username: username,
        PasswordHash: password,
      })
      alert("account created successfully")
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h2 className="createaccount">Create an account</h2>
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
      <button onClick={handleCreateAccount} className="createaccount-button">
        Sign Up
      </button>
    </>
  )
}

export default CreateAccountForm
