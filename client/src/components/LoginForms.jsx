import { useAuth } from "./AuthProvider"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { baseApi } from "../api/base"
import { checkUsername, checkPassword } from "../helpers/validators"

export function LoginForms() {
  const { isSignUp, toggleSignUp, setUser, getData } = useAuth()
  const navigate = useNavigate()

  const [usernameErrors, setUsernameErrors] = useState([])
  const [passwordErrors, setPasswordErrors] = useState([])

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })

  function handleChange(e) {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSubmitGuest(e) {
    e.preventDefault()
    const guestCredentials = {
      username: import.meta.env.VITE_GUEST_USER,
      password: import.meta.env.VITE_GUEST_PASSWORD,
    }
    loginAction(guestCredentials)
  }

  function clearInput() {
    setCredentials({ username: "", password: "" })
  }

  async function handleSubmit() {
    const { username, password } = credentials

    const usernameResults = checkUsername(username, isSignUp)
    const passwordresults = checkPassword(password, isSignUp)

    setUsernameErrors(usernameResults)
    setPasswordErrors(passwordresults)

    if (usernameErrors?.length === 0 && passwordErrors?.length === 0) {
      loginAction(credentials)
      clearInput()
      return
    }
  }

  async function loginAction(data) {
    const { username, password } = data
    const path = isSignUp ? `users/signup` : `users/login`

    try {
      const res = await baseApi.post(path, {
        Username: username,
        PasswordHash: password,
      })

      setUser(res.data.value)
      if (isSignUp) {
        await getData()
      }
      alert("logged in success!")

      navigate("/chatroom")
      return
    } catch (error) {
      handleLoginError(error.response.status)
    }
  }

  function handleLoginError(errorResponse) {
    const results = renderLoginErrors(errorResponse)
    setPasswordErrors(results)
  }

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmitGuest}>
          <div className="choose-login">Visit as guest</div>
          <button className="login">Guest</button>
        </form>

        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <div className="choose-login">
            {isSignUp ? `Create account` : `Login`}
          </div>
          <div
            className={`form-group ${
              usernameErrors?.length > 0 ? "error" : ""
            }`}
          >
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              className="input"
              type="text"
              id="username"
              name="username"
              placeholder="...enter username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
            {usernameErrors?.length > 0 && (
              <div className="msg">{usernameErrors.join(", ")}</div>
            )}
          </div>
          <div
            className={`form-group ${
              passwordErrors?.length > 0 ? "error" : ""
            }`}
          >
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              placeholder="...enter password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            {passwordErrors?.length > 0 && (
              <div className="msg">{passwordErrors.join(", ")}</div>
            )}
          </div>
          <button className="login">{isSignUp ? `Sign Up` : `Login`}</button>
        </form>
      </div>
      <button className="switch-submit" onClick={toggleSignUp}>
        {isSignUp ? `Switch to Login` : `Switch to Sign Up`}
      </button>
    </>
  )
}
