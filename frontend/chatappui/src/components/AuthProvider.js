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
        const newUser = {
          userId,
          username,
          token,
        }
        const addNewUser = [...authorizedUsers, newUser]
        setUser(userId)
        setAuthorizedUsers(addNewUser)
        alert("logged in success!")
        navigate("/chatroom")
        return
      }
    } catch (error) {
      console.error(error)
    }
  }

  const curr = authorizedUsers.find((authUser) => (authUser.id = user))
  //console.log("authorized user:", curr)

  function toggleSignUp() {
    setIsSignup((prev) => !prev)
  }

  function logOut(id) {
    const updatedUsers = authorizedUsers.filter((users) => users.userId !== id)
    console.log("removed user:", updatedUsers)
    setAuthorizedUsers(updatedUsers)

    localStorage.clear()
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
