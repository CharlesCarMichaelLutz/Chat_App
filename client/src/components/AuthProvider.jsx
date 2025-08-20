import { useState, useContext, createContext } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

const USER = "USER"

export function AuthProvider({ children }) {
  const navigate = useNavigate()

  const [user, setUser] = useLocalStorage(USER, "")
  const [isSignUp, setIsSignup] = useState(false)

  function toggleSignUp() {
    setIsSignup((prev) => !prev)
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
        handleLogout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
