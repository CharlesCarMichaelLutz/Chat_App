import { useState } from "react"
import { useAuth } from "../components/AuthProvider"
import { useNavigate } from "react-router-dom"
import { baseApi } from "../api/base"
import {
  checkUsername,
  checkPassword,
  renderLoginErrors,
} from "../helpers/validators"

export function useLoginForm() {
  const { setUser, isSignUp } = useAuth()
  const navigate = useNavigate()

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

  function handleSubmitGuest(e) {
    e.preventDefault()
    const guestCredentials = {
      username: import.meta.env.VITE_GUEST_USER,
      password: import.meta.env.VITE_GUEST_PASSWORD,
    }
    loginAction(guestCredentials)
  }

  function clearInput() {
    setCredentials({ username: "", password: "" })
  }

  function handleSubmit() {
    const { username, password } = credentials

    const usernameResults = checkUsername(username, isSignUp)
    const passwordresults = checkPassword(password, isSignUp)

    setUsernameErrors(usernameResults)
    setPasswordErrors(passwordresults)

    if (usernameErrors?.length === 0 && passwordErrors?.length === 0) {
      loginAction(credentials)
      clearInput()
      return
    }
  }

  // function handleSubmitCreate() {
  //   const { username, password } = credentials

  //   const usernameResults = checkUsername(username, isSignUp)
  //   const passwordresults = checkPassword(password, isSignUp)

  //   setUsernameErrors(usernameResults)
  //   setPasswordErrors(passwordresults)

  //   if (usernameErrors?.length === 0 && passwordErrors?.length === 0) {
  //     loginAction(credentials)
  //     clearInput()
  //     return
  //   }
  // }

  async function loginAction(data) {
    const { username, password } = data
    const path = isSignUp ? `users/signup` : `users/login`

    try {
      const res = await baseApi.post(path, {
        Username: username,
        PasswordHash: password,
      })

      if (isSignUp) {
        accountStatus
          ? alert("Account created successfully!")
          : alert("failed to create account")
        return accountStatus
      }

      setUser(res.data.value)
      alert("logged in success!")
      navigate("/chatroom")
      return
    } catch (error) {
      handleLoginError(error.response.status)
    }
  }

  // async function loginAction(data) {
  //   const { username, password } = data

  //   try {
  //     const res = await baseApi.post(`users/login`, {
  //       Username: username,
  //       PasswordHash: password,
  //     })

  //     setUser(res.data.value)
  //     alert("logged in success!")
  //     navigate("/chatroom")
  //     return
  //   } catch (error) {
  //     handleLoginError(error.response.status)
  //   }
  // }

  function handleLoginError(errorResponse) {
    const results = renderLoginErrors(errorResponse)
    setPasswordErrors(results)
  }

  // async function createUserSubmit(data) {
  //   const { username, password } = data

  //   try {
  //     const res = await baseApi.post(`users/signup`, {
  //       Username: username,
  //       PasswordHash: password,
  //     })

  //     setUser(res.data.value)
  //     alert("logged in success!")
  //     navigate("/chatroom")
  //     return
  //   } catch (error) {
  //     //handleLoginError(error.response.status)
  //     console.error(error)
  //   }
  // }

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
