import { useState, useContext, createContext, useEffect } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"
import { useWebSocket } from "../hooks/useWebSocket"

const AuthContext = createContext()

const USER = "USER"

export function AuthProvider({ children }) {
  const navigate = useNavigate()

  const [user, setUser] = useLocalStorage(USER, "")
  const [isSignUp, setIsSignup] = useState(false)
  const [usernameList, setUsernameList] = useState([])
  const [messageList, setMessageList] = useState([])
  const [loading, setLoading] = useState(true)
  const { hubConnection } = useWebSocket(setMessageList, setUsernameList)

  function toggleSignUp() {
    setIsSignup((prev) => !prev)
  }

  function handleLogout() {
    setUser({})
    localStorage.clear()
    navigate("/")
  }

  async function getData() {
    try {
      if (hubConnection) {
        await hubConnection.invoke("GetMessageList", user.token)
        await hubConnection.invoke("GetUserList", user.token)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isSignUp,
        toggleSignUp,
        usernameList,
        setUsernameList,
        messageList,
        setMessageList,
        handleLogout,
        getData,
        setLoading,
        hubConnection,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
