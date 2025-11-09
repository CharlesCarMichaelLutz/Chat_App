import React from "react"

const SignupForm = ({
  signupSubmit,
  usernameErrors,
  credentials,
  handleChange,
  passwordErrors,
}) => {
  return (
    <>
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault()
          signupSubmit()
        }}
      >
        <div className="choose-login">Create account</div>
        <div
          className={`form-group ${usernameErrors?.length > 0 ? "error" : ""}`}
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
          className={`form-group ${passwordErrors?.length > 0 ? "error" : ""}`}
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
        <button className="login">Sign Up</button>
      </form>
    </>
  )
}

export default SignupForm
