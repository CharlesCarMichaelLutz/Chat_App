import { useLoginForm } from "../hooks/useLoginForm"

export function GuestLoginForm() {
  const { handleSubmitGuest } = useLoginForm()
  return (
    <>
      <form onSubmit={handleSubmitGuest}>
        <h2>Visit as guest</h2>
        <button>Guest</button>
      </form>
    </>
  )
}
