import { useState } from "react"
import { useAuth } from "../components/AuthProvider"

export function useLoginForm() {
  const { loginAction } = useAuth()

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })

  function handleChange(e) {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function clearInput() {
    setCredentials({ username: "", password: "" })
  }

  function handleSubmit() {
    const { username, password } = credentials
    if (username !== "" && password !== "") {
      loginAction(credentials)
      clearInput()
      return
    }
    alert("Username and Password must not be empty")
  }

  function handleSubmitGuest(e) {
    e.preventDefault()
    const guestCredentials = {
      username: import.meta.env.VITE_GUEST_USER,
      password: import.meta.env.VITE_GUEST_PASSWORD,
    }
    loginAction(guestCredentials)
  }

  return {
    credentials,
    handleChange,
    handleSubmit,
    clearInput,
    handleSubmitGuest,
    //loginAction,
  }
}
