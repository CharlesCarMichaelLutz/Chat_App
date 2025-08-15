import { useAuth } from "./AuthProvider"
import { useLoginForm } from "../hooks/useLoginForm"

export function LoginForms() {
  const { isSignUp, toggleSignUp } = useAuth()
  const {
    credentials: { username, password },
    handleChange,
    handleSubmit,
    handleSubmitGuest,
    usernameErrors,
    passwordErrors,
  } = useLoginForm()

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
              value={username}
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
              value={password}
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
