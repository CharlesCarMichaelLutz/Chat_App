import React from "react";

const GuestLoginForm = ({ handleGuestSubmit }) => {
  return (
    <>
      <form className="login-form" onSubmit={handleGuestSubmit}>
        <h3 className="login-text">Visit as guest</h3>
        <button type="submit">Enter</button>
      </form>
    </>
  );
};

export default GuestLoginForm;
