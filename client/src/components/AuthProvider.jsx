import { useState, useContext, createContext } from "react"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { baseApi } from "../api/base"

const AuthContext = createContext()

const USER = "USER"

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage(USER, "")
  const [isSignUp, setIsSignup] = useState(false)
  const navigate = useNavigate()

  function toggleSignUp() {
    setIsSignup((prev) => !prev)
  }

  async function loginAction(data) {
    const { username, password } = data
    const path = isSignUp ? `users/signup` : `users/login`
    try {
      const res = await baseApi.post(path, {
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

  function handleLogout() {
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
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
