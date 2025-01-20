import { useState, useContext, createContext } from "react"
import axios from "axios"
import { endpoints } from "./Endpoints"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage"

const AuthContext = createContext()

const USER = "USER"
//const USER_CREDENTIALS = "USER_CREDENTIALS"

function AuthProvider({ children }) {
  //Perhaps this does not need to be in localStorage but just a piece of State
  const [user, setUser] = useLocalStorage(USER, "")
  //Does this need to be an array or can it just be an empty string
  //const [credentials, setCredentials] = useLocalStorage(USER_CREDENTIALS, [])
  const [isSignUp, setIsSignup] = useState(false)
  const navigate = useNavigate()

  async function loginAction(data) {
    //send the credendtials to the server
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
      //debug to make it cleaner if possible
      //const { userId, username, token } = res.data.values
      //const newUser = { userId, username, token }
      //setCredentials((prevUsers) => [...prevUsers, newUser])

      //setUser(userId)
      setUser(res.data.values)
      alert("logged in success!")
      navigate("/chatroom")
      return
    } catch (error) {
      console.error(error)
    }
  }

  //const curr = user.find((currentUser) => currentUser.userId === user)

  function toggleSignUp() {
    setIsSignup((prev) => !prev)
  }

  //function logOut(id) {
  function logOut() {
    // setCredentials(
    //   credentials.filter((currentUser) => currentUser.userId !== id)
    // )
    setUser({})
    //setUser(null)
    localStorage.clear()
    navigate("/")
  }

  return (
    <AuthContext.Provider
      value={{
        loginAction,
        isSignUp,
        toggleSignUp,
        logOut,
        user,
        //curr,
        //credentials,
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
