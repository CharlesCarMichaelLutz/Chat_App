import { useState, useContext, createContext } from "react"
import axios from "axios"
import { endpoints } from "./Endpoints"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage"

const AuthContext = createContext()

const USERS = "AUTHORIZED_Key"
const ID = "ID_Key"

function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage(ID, "")
  const [authorizedUsers, setAuthorizedUsers] = useLocalStorage(USERS, [])
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
        if (res.data) {
          alert("Account created successfully!")
        } else {
          alert("failed to create account")
        }
      } else {
        const { userId, username, token } = res.data.value
        const existingUser = authorizedUsers.findIndex(
          (user) => user.userId === userId
        )
        if (existingUser === -1) {
          const newUser = {
            userId,
            username,
            token,
            isLoggedIn: true,
          }
          setAuthorizedUsers([...authorizedUsers, newUser])
        } else {
          const updatedUsers = [...authorizedUsers]
          updatedUsers[existingUser].isLoggedIn = true
          setAuthorizedUsers(updatedUsers)
        }
        setUser(userId)
        //alert("logged in success!")
        navigate("/chatroom")
        return
      }
    } catch (error) {
      console.error(error)
    }
  }

  const curr = authorizedUsers.find((authUser) => authUser.userId === user)

  function toggleSignUp() {
    setIsSignup((prev) => !prev)
  }

  function logOut(id) {
    //const updatedUsers = authorizedUsers.filter((users) => users.userId !== id)
    const updatedUsers = authorizedUsers.map((users) => {
      if (users.userId === id) {
        return { ...user, isLoggedIn: false }
      }
      return user
    })

    setAuthorizedUsers(updatedUsers)
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
        authorizedUsers,
        user,
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
