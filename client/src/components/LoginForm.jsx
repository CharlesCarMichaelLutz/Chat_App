import { useAuth } from "./AuthProvider"
import { useLoginForm } from "../hooks/useLoginForm"

export function LoginForm() {
  const { isSignUp, toggleSignUp } = useAuth()
  const { credentials, handleChange, handleSubmit } = useLoginForm()
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <h2>{isSignUp ? `Create account` : `Login`}</h2>
        <label htmlFor="username">
          Username
          <input
            className="username--input"
            type="text"
            id="username"
            name="username"
            placeholder="...enter username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            className="password--input"
            type="password"
            id="password"
            name="password"
            placeholder="...enter password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </label>
        <button>{isSignUp ? `Sign Up` : `Login`}</button>
      </form>
      <button onClick={toggleSignUp}>
        {isSignUp ? `Switch to Login` : `Switch to Sign Up`}
      </button>
    </>
  )
}
