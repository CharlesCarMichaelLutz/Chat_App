import { useState, useContext, createContext } from "react"
import axios from "axios"
import { endpoints } from "./Endpoints"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage"

const AuthContext = createContext()

const USER = "USER"

function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage(USER, "")
  const [isSignUp, setIsSignup] = useState(false)
  const navigate = useNavigate()

  function toggleSignUp() {
    setIsSignup((prev) => !prev)
  }

  async function loginAction(data) {
    const { username, password } = data
    const path = isSignUp ? `users/signup` : `users/login`
    const url = endpoints.BASE_URI + path
    try {
      const res = await axios.post(url, {
        Username: username,
        PasswordHash: password,
      })

      if (isSignUp) {
        const accountStatus = res.data
          ? alert("Account created successfully!")
          : alert("failed to create account")
        return accountStatus
      }
      setUser(res.data.value)
      alert("logged in success!")
      navigate("/chatroom")
      return
    } catch (error) {
      console.error(error)
    }
  }

  function logOut() {
    setUser({})
    localStorage.clear()
    navigate("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isSignUp,
        toggleSignUp,
        loginAction,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider

export const useAuth = () => {
  return useContext(AuthContext)
}
