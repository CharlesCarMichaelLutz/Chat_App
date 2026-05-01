import React from "react";

const RegisterForm = ({
  handleRegisterSubmit,
  username,
  password,
  handleUsername,
  handlePassword,
  userErrors,
  passErrors,
}) => {
  return (
    <>
      <form className="login-form" onSubmit={handleRegisterSubmit}>
        <h3 className="login-text">Create Account</h3>
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
          {userErrors.length > 0 && (
            <div className="login-errors">{`Must: ${userErrors.join(", ")}`}</div>
          )}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
            placeholder="...enter password"
            required
          />
          {passErrors.length > 0 && (
            <div className="login-errors">{`Must: ${passErrors.join(", ")}`}</div>
          )}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default RegisterForm;
