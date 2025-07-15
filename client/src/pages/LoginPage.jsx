import { LoginForms } from "../components/LoginForms"
import rabbit from "../images/rabbitchat.jpg"

export function LoginPage() {
  return (
    <>
      <img src={rabbit} alt="rabbit chat image" />
      <LoginForms />
    </>
  )
}
