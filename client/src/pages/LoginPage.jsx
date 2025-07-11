import { LoginForm } from "../components/LoginForm"
import { GuestLoginForm } from "../components/GuestLoginForm"

export function LoginPage() {
  return (
    <>
      <GuestLoginForm />
      <LoginForm />
    </>
  )
}
