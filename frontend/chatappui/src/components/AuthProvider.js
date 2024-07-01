import { useState, useContext, createContext } from "react"
import axios from "axios"
import { endpoints } from "./Endpoints"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage"

const AuthContext = createContext()

const USERS = "Local_Storage_Key"

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
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

      console.log("login response:", res.data.value)

      if (isSignUp) {
        if (res.data) {
          alert("Account created successfully!")
        } else {
          alert("failed to create account")
        }
      } else {
        const { userId, username, token } = res.data.value
        const newUser = {
          userId,
          username,
          token,
        }
        console.log(newUser)
        const addNewUser = [...loggedInUsers, newUser]

        setCurrentUser(userId)
        setLoggedInUsers(addNewUser)
        alert("logged in success!")
        navigate("/chatroom")
        return
      }
    } catch (error) {
      console.error(error)
    }
  }

  function toggleSignUp() {
    setIsSignup((prev) => !prev)
  }

  function logOut(id) {
    const updatedUsers = loggedInUsers.filter((users) => users.userId !== id)
    setLoggedInUsers(updatedUsers)
    setCurrentUser(null)
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
        currentUser,
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
