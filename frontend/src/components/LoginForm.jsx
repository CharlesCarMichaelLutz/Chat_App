import React from "react";

const LoginForm = ({
  handleLoginSubmit,
  username,
  password,
  handleUsername,
  handlePassword,
  userErrors,
}) => {
  return (
    <>
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <h3 className="login-text">Login</h3>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsername}
            placeholder="...enter username"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
            placeholder="...enter password"
            required
          />
          {userErrors.length > 0 && (
            <div className="login-errors">{userErrors.join(", ")}</div>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
