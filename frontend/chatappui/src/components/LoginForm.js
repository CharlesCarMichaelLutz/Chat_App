import { useState } from "react"
import useAuth from "../components/AuthProvider"
//import rabbit from ""

function LoginForm() {
  const { isSignUp, toggleSignUp, loginAction } = useAuth()

  const [input, setInput] = useState({
    username: "",
    password: "",
  })

  function handleChange(e) {
    const { name, value } = e.target
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function clearInput() {
    setInput({ username: "", password: "" })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { username, password } = input
    if (username !== "" && password !== "") {
      loginAction(input)
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
          value={input.username}
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
          value={input.password}
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
