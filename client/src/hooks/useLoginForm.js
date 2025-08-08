import { useState } from "react"
import { useAuth } from "../components/AuthProvider"
import { checkUsername, checkPassword } from "../helpers/validators"

export function useLoginForm() {
  const { loginAction } = useAuth()

  const [usernameErrors, setUsernameErrors] = useState([])
  const [passwordErrors, setPasswordErrors] = useState([])

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
    //swap out new validation logic here
    // if (isSignup) {
    // }
    const usernameResults = checkUsername(username)
    const passwordresults = checkPassword(password)

    setUsernameErrors(usernameResults)
    setPasswordErrors(passwordresults)

    if (usernameErrors < 0 && passwordErrors < 0) {
      loginAction(credentials)
      clearInput()
      return
    }
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
    usernameErrors,
    passwordErrors,
  }
}
