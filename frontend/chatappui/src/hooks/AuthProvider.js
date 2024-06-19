import { useContext, createContext, useState } from "react"
import axios from "axios"
import { endpoints } from "../components/Endpoints"
//import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("site") || "")
  const [isSignUp, setIsSignup] = useState(false)
  //const navigate = useNavigate()

  async function loginAction(data) {
    const { username, password } = data
    const path = isSignUp ? `users/signup` : `users/login`
    const url = endpoints.BASE_URI + path

    try {
      const res = await axios.post(url, {
        Username: username,
        PasswordHash: password,
      })

      console.log(res)

      if (isSignUp) {
        if (res.data) {
          alert("Account created successfully!")
        } else {
          alert("failed to create account")
        }
      } else {
        const jwt = res.data.value
        setUser(res.data)
        setToken(jwt)
        localStorage.setItem("site", jwt)
        alert("logged in success!")
        //navigate("/chatroom")
        return
      }
    } catch (error) {
      console.error(error)
    }
  }

  function toggleSignUp() {
    setIsSignup((prev) => !prev)
    console.log("toggle called")
  }

  function logOut() {
    setUser(null)
    setToken("")
    localStorage.removeItem("site")
    //navigate("/login")
  }

  return (
    <AuthContext.Provider
      value={{ loginAction, isSignUp, toggleSignUp, user, token, logOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider

export const useAuth = () => {
  return useContext(AuthContext)
}
