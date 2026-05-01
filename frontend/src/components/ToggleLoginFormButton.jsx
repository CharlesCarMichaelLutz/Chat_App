import React from "react";

const ToggleLoginFormButton = ({ toggleSignUp, isSignUp }) => {
  return (
    <>
      <div className="toggle-container">
        <button onClick={toggleSignUp} className="toggle-login-button">
          {isSignUp
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </>
  );
};

export default ToggleLoginFormButton;
