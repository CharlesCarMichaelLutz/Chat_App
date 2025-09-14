import React from "react"

const LoginForm = ({
  loginRequest,
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
          loginRequest(credentials)
        }}
      >
        <div className="choose-login">Login</div>
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
        <button className="login">Login</button>
      </form>
    </>
  )
}

export default LoginForm
