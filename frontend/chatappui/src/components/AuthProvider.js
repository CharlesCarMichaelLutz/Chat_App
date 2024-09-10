import { useState, useContext, createContext } from "react"
import axios from "axios"
import { endpoints } from "./Endpoints"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage"

const AuthContext = createContext()

const USER_ID = "ID_Key"
const USERS = "USERS"

function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage(USER_ID, "")
  const [loggedInUsers, setLoggedInUsers] = useLocalStorage(USERS, [])
  const [isSignUp, setIsSignup] = useState(false)
  const navigate = useNavigate()

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
      } else {
        const { userId, username, token } = res.data.value
        const existingUserId = loggedInUsers.findIndex(
          (user) => user.userId === userId
        )
        if (existingUserId === -1) {
          const newUser = { userId, username, token }
          setLoggedInUsers((prevUsers) => [...prevUsers, newUser])
        }

        setUser(userId)
        alert("logged in success!")
        navigate("/chatroom")
        return
      }
    } catch (error) {
      console.error(error)
    }
  }

  const curr = loggedInUsers.find((currentUser) => currentUser.userId === user)

  function toggleSignUp() {
    setIsSignup((prev) => !prev)
  }

  function logOut(id) {
    setLoggedInUsers(
      loggedInUsers.filter((currentUser) => currentUser.userId !== id)
    )
    setUser(null)
    navigate("/")
  }

  return (
    <AuthContext.Provider
      value={{
        loginAction,
        isSignUp,
        toggleSignUp,
        logOut,
        loggedInUsers,
        curr,
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
