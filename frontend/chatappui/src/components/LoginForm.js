import { useAuth } from "./AuthProvider"
import { useLoginForm } from "../hooks/useLoginForm"

export function LoginForm() {
  const { isSignUp, toggleSignUp } = useAuth()
  const { credentials, handleChange, handleSubmit } = useLoginForm()
  return (
    <>
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <h2>{isSignUp ? `Create account` : `Login`}</h2>
        <label className="label" htmlFor="username">
          Username
          <input
            className="username--input"
            type="text"
            id="username"
            name="username"
            placeholder="...enter username"
            value={credentials.username}
            required
            onChange={handleChange}
          />
        </label>
        <label className="label" htmlFor="password">
          Password
          <input
            className="password--input"
            type="password"
            id="password"
            name="password"
            placeholder="...enter password"
            value={credentials.password}
            required
            onChange={handleChange}
          />
        </label>
        <button className="login-button">
          {isSignUp ? `Sign Up` : `Login`}
        </button>
      </form>
      <button type="button" onClick={toggleSignUp}>
        {isSignUp ? `Switch to Login` : `Switch to Sign Up`}
      </button>
    </>
  )
}
