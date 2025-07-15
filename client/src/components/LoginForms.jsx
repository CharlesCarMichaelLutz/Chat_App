import { useAuth } from "./AuthProvider"
import { useLoginForm } from "../hooks/useLoginForm"

export function LoginForms() {
  const { isSignUp, toggleSignUp } = useAuth()
  const { credentials, handleChange, handleSubmit, handleSubmitGuest } =
    useLoginForm()
  return (
    <>
      <div className="login-container">
        <fieldset>
          <form onSubmit={handleSubmitGuest}>
            <legend>Visit as guest</legend>
            <button className="login">Guest</button>
          </form>
        </fieldset>

        <fieldset>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <legend>{isSignUp ? `Create account` : `Login`}</legend>
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
            <button className="login">{isSignUp ? `Sign Up` : `Login`}</button>
          </form>
        </fieldset>

        <button className="switch-submit" onClick={toggleSignUp}>
          {isSignUp ? `Switch to Login` : `Switch to Sign Up`}
        </button>
      </div>
    </>
  )
}
