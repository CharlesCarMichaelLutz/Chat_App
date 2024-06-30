import { useState, useEffect, useContext, createContext } from "react"
import axios from "axios"
import { endpoints } from "./Endpoints"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loggedInUsers, setLoggedInUsers] = useState(
    JSON.parse(localStorage.getItem("users") || [])
  )
  const [isSignUp, setIsSignup] = useState(false)
  const navigate = useNavigate()

  // useEffect(() => {
  //   const storedUsers = localStorage.getItem("users") || []
  //   if (storedUsers) {
  //     setLoggedInUser(JSON.parse(storedUsers))
  //   }
  // }, [])

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(loggedInUsers))
  }, [loggedInUsers])

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
        const addNewUser = loggedInUsers.map((prevUser) => [
          ...prevUser,
          newUser,
        ])
        //setCurrentUser(res.data.value.userId)
        setCurrentUser(userId)
        setLoggedInUsers(addNewUser)
        //localStorage.setItem("users", JSON.stringify([newUser]))
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
    localStorage.setItem("users", JSON.stringify(updatedUsers))
    setCurrentUser(null)
    navigate("/login")
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
