import React from "react"

const GuestForm = ({ guestSubmit }) => {
  return (
    <>
      <form className="login-form" onSubmit={guestSubmit}>
        <div className="choose-login">Visit as guest</div>
        <button className="login">Guest</button>
      </form>
    </>
  )
}

export default GuestForm
