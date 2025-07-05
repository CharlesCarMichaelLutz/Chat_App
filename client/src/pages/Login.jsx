import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
// import { GuestLoginForm } from "../components/GuestLoginForm"
// import { LoginForm } from "../components/LoginForm"
import { loginUser, createUser } from "../api/login"
import { AuthenticatedRoute } from "../components/AuthenticatedRoute"
import { useLocalStorage } from "../hooks/useLocalStorage"
import rabbit from "../images/rabbitchat.jpg"
import { Chatroom } from "./Chatroom"

const USER = "USER"

export function Login() {
  const [isSignup, setIsSignup] = useState(false)
  const [user, setUser] = useLocalStorage(USER, "")
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const navigate = useNavigate()

  async function loginAction(credentials) {
    try {
      const result = isSignup
        ? await createUser(credentials)
        : await loginUser(credentials)
      setUser(result.data.value)
      navigate("/chatroom")
    } catch (error) {
      console.error("Login error:", error)
      alert("Failed to login. Please try again.")
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const { username, password } = credentials
    if (!username || !password) {
      alert("Username and Password must not be empty")
      return
    }
    try {
      await loginAction(credentials)
      clearInput()
    } catch (error) {
      console.error("Submit error:", error)
    }
  }

  async function handleSubmitGuest() {
    e.preventDefault()
    const guestCredentials = {
      username: import.meta.env.VITE_GUEST_USER,
      password: import.meta.env.VITE_GUEST_PASSWORD,
    }
    await loginAction(guestCredentials)
    clearInput()
  }

  function clearInput() {
    setCredentials({ username: "", password: "" })
  }

  function toggleSignUp() {
    setIsSignup((prev) => !prev)
  }

  function onLogout() {
    setUser({})
    localStorage.clear()
    navigate("/")
  }

  return (
    <>
      <img src={rabbit} alt="rabbit chat image" />
      <fieldset>
        <form onSubmit={handleSubmitGuest}>
          <legend>Visit as guest</legend>
          <button className="login">Guest</button>
        </form>
      </fieldset>

      <fieldset>
        <form onSubmit={handleSubmit}>
          <legend>{isSignup ? `Create account` : `Login`}</legend>
          <label htmlFor="username">
            Username
            <input
              required
              type="text"
              id="username"
              name="username"
              placeholder="...enter a username"
              value={credentials.username}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              required
              type="password"
              id="passsword"
              name="password"
              placeholder="...enter a password"
              value={credentials.password}
              onChange={handleChange}
            />
          </label>
          <button className="login">{isSignup ? `Sign Up` : `Login`}</button>
        </form>
      </fieldset>

      <button className="switch-submit" onClick={toggleSignUp}>
        {isSignup ? `Switch to Login` : `Switch to Sign Up`}
      </button>

      <button onClick={onLogout}>Logout</button>

      <AuthenticatedRoute user={user} />
      {/* <Chatroom user={user} /> */}
    </>
  )
}
