import { Header } from "../components/Header"
import { LoginForm } from "../components/LoginForm"
import { GuestLoginForm } from "../components/GuestLoginForm"

export function Login() {
  return (
    <div className="login--form">
      <Header />
      <GuestLoginForm />
      <LoginForm />
    </div>
  )
}
