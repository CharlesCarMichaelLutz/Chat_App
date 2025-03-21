import { useLoginForm } from "../hooks/useLoginForm"

export function GuestLoginForm() {
  const { handleSubmitGuest } = useLoginForm()
  return (
    <>
      <form className="login-guest-form" onSubmit={handleSubmitGuest}>
        <h2 htmlFor="guest-button-label">Visit as guest</h2>
        <button className="guest-button">Guest</button>
      </form>
    </>
  )
}
