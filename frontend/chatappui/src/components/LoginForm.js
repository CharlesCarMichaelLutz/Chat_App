import { useState } from "react"
import { useAuth } from "./AuthProvider"
//import { useNavigate } from "react-router-dom"
//import rabbit from ""

function LoginForm() {
  const { isSignUp, toggleSignUp, loginAction } = useAuth()

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

  function clearInput() {
    setCredentials({ username: "", password: "" })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { username, password } = credentials
    if (username !== "" && password !== "") {
      loginAction(credentials)
      //navigate("/chatroom")
      clearInput()
      return
    }
    alert("Username and Password must not be empty")
  }

  return (
    <div className="login--form">
      <header className="Home--header">
        {/* <img src={rabbit} alt={"rabbit image"} className="Home--logo" /> */}
        <h1 className="Home--title">Rabbit Chat</h1>
      </header>

      <form onSubmit={handleSubmit}>
        {/* <h2 htmlFor="guest--button">View as guest</h2>
        <button className="guest--button">Guest</button> */}

        <h2>{isSignUp ? `Create account` : `Login`}</h2>
        <label className="label" htmlFor="username">
          Username
        </label>
        <input
          className="username--input"
          type="text"
          id="username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="password--input"
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button className="login--button">
          {isSignUp ? `Sign Up` : `Login`}
        </button>
      </form>
      <button type="button" onClick={toggleSignUp}>
        {isSignUp ? `Switch to Login` : `Switch to Sign Up`}
      </button>
    </div>
  )
}

export default LoginForm
