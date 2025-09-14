// import rabbit from "../images/rabbitchat.jpg"
// import { useAuth } from "../components/AuthProvider"
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { baseApi } from "../api/base"
// import {
//   checkUsername,
//   checkPassword,
//   renderLoginErrors,
// } from "../helpers/validators"

// export function LoginPage() {
//   const { isSignUp, toggleSignUp, setUser } = useAuth()
//   const navigate = useNavigate()

//   const [usernameErrors, setUsernameErrors] = useState([])
//   const [passwordErrors, setPasswordErrors] = useState([])

//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: "",
//   })

//   function handleChange(e) {
//     const { name, value } = e.target
//     setCredentials((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   function clearInput() {
//     setCredentials({ username: "", password: "" })
//   }

//   async function signupRequest(data) {
//     const { username, password } = data

//     try {
//       const res = await baseApi.post(`users/signup`, {
//         Username: username,
//         PasswordHash: password,
//       })

//       setUser(res.data)
//     } catch (error) {
//       console.log("error:", error)
//     } finally {
//       clearInput()
//       navigate("/chatroom")
//     }
//   }

//   async function loginRequest(data) {
//     const { username, password } = data

//     try {
//       const res = await baseApi.post(`users/login`, {
//         Username: username,
//         PasswordHash: password,
//       })

//       setUser(res.data.value)
//     } catch (error) {
//       handleLoginError(error.response.status)
//     } finally {
//       clearInput()
//       navigate("/chatroom")
//     }
//   }

//   function guestSubmit(e) {
//     e.preventDefault()
//     const guestCredentials = {
//       username: import.meta.env.VITE_GUEST_USER,
//       password: import.meta.env.VITE_GUEST_PASSWORD,
//     }
//     loginRequest(guestCredentials)
//   }

//   async function signupSubmit() {
//     const { username, password } = credentials

//     const usernameResults = checkUsername(username)
//     const passwordresults = checkPassword(password)

//     setUsernameErrors(usernameResults)
//     setPasswordErrors(passwordresults)

//     if (usernameErrors.length === 0 && passwordErrors.length === 0) {
//       signupRequest(credentials)
//     }
//   }

//   function handleLoginError(response) {
//     const results = renderLoginErrors(response)
//     setPasswordErrors(results)
//   }

//   return (
//     <>
//       <img src={rabbit} alt="rabbit chat image" />
//       <div className="login-container">
//         <form className="login-form" onSubmit={guestSubmit}>
//           <div className="choose-login">Visit as guest</div>
//           <button className="login">Guest</button>
//         </form>

//         {isSignUp ? (
//           //SIGN UP
//           <form
//             className="login-form"
//             onSubmit={(e) => {
//               e.preventDefault()
//               signupSubmit()
//             }}
//           >
//             <div className="choose-login">Create account</div>
//             <div
//               className={`form-group ${
//                 usernameErrors?.length > 0 ? "error" : ""
//               }`}
//             >
//               <label className="label" htmlFor="username">
//                 Username
//               </label>
//               <input
//                 className="input"
//                 type="text"
//                 id="username"
//                 name="username"
//                 placeholder="...enter username"
//                 value={credentials.username}
//                 onChange={handleChange}
//                 required
//               />
//               {usernameErrors?.length > 0 && (
//                 <div className="msg">{usernameErrors.join(", ")}</div>
//               )}
//             </div>
//             <div
//               className={`form-group ${
//                 passwordErrors?.length > 0 ? "error" : ""
//               }`}
//             >
//               <label className="label" htmlFor="password">
//                 Password
//               </label>
//               <input
//                 className="input"
//                 type="password"
//                 id="password"
//                 name="password"
//                 placeholder="...enter password"
//                 value={credentials.password}
//                 onChange={handleChange}
//                 required
//               />
//               {passwordErrors?.length > 0 && (
//                 <div className="msg">{passwordErrors.join(", ")}</div>
//               )}
//             </div>
//             <button className="login">Sign Up</button>
//           </form>
//         ) : (
//           //LOGIN
//           <form
//             className="login-form"
//             onSubmit={(e) => {
//               e.preventDefault()
//               loginRequest(credentials)
//             }}
//           >
//             <div className="choose-login">Login</div>
//             <label className="label" htmlFor="username">
//               Username
//             </label>
//             <input
//               className="input"
//               type="text"
//               id="username"
//               name="username"
//               placeholder="...enter username"
//               value={credentials.username}
//               onChange={handleChange}
//               required
//             />
//             <div
//               className={`form-group ${
//                 passwordErrors?.length > 0 ? "error" : ""
//               }`}
//             >
//               <label className="label" htmlFor="password">
//                 Password
//               </label>
//               <input
//                 className="input"
//                 type="password"
//                 id="password"
//                 name="password"
//                 placeholder="...enter password"
//                 value={credentials.password}
//                 onChange={handleChange}
//                 required
//               />
//               {passwordErrors?.length > 0 && (
//                 <div className="msg">{passwordErrors.join(", ")}</div>
//               )}
//             </div>
//             <button className="login">Login</button>
//           </form>
//         )}
//       </div>
//       <button className="switch-submit" onClick={toggleSignUp}>
//         {isSignUp ? `Switch to Login` : `Switch to Sign Up`}
//       </button>
//     </>
//   )
// }

import rabbit from "../images/rabbitchat.jpg"
import { useAuth } from "../components/AuthProvider"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { baseApi } from "../api/base"
import {
  checkUsername,
  checkPassword,
  renderLoginErrors,
} from "../helpers/validators"
import GuestForm from "../components/GuestForm"
import SignupForm from "../components/SignupForm"
import LoginForm from "../components/LoginForm"

export function LoginPage() {
  const { isSignUp, toggleSignUp, setUser } = useAuth()
  const navigate = useNavigate()

  const [usernameErrors, setUsernameErrors] = useState([])
  const [passwordErrors, setPasswordErrors] = useState([])

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })

  function handleChange(e) {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function clearInput() {
    setCredentials({ username: "", password: "" })
  }

  async function signupRequest(data) {
    const { username, password } = data

    try {
      const res = await baseApi.post(`users/signup`, {
        Username: username,
        PasswordHash: password,
      })

      setUser(res.data)
    } catch (error) {
      console.log("error:", error)
    } finally {
      clearInput()
      navigate("/chatroom")
    }
  }

  async function loginRequest(data) {
    const { username, password } = data

    try {
      const res = await baseApi.post(`users/login`, {
        Username: username,
        PasswordHash: password,
      })

      setUser(res.data.value)
    } catch (error) {
      handleLoginError(error.response.status)
    } finally {
      clearInput()
      navigate("/chatroom")
    }
  }

  function guestSubmit(e) {
    e.preventDefault()
    const guestCredentials = {
      username: import.meta.env.VITE_GUEST_USER,
      password: import.meta.env.VITE_GUEST_PASSWORD,
    }
    loginRequest(guestCredentials)
  }

  async function signupSubmit() {
    const { username, password } = credentials

    const usernameResults = checkUsername(username)
    const passwordresults = checkPassword(password)

    setUsernameErrors(usernameResults)
    setPasswordErrors(passwordresults)

    if (usernameErrors.length === 0 && passwordErrors.length === 0) {
      signupRequest(credentials)
    }
  }

  function handleLoginError(response) {
    const results = renderLoginErrors(response)
    setPasswordErrors(results)
  }

  return (
    <>
      <img src={rabbit} alt="rabbit chat image" />
      <div className="login-container">
        <GuestForm guestSubmit={guestSubmit} />

        {isSignUp ? (
          //SIGN UP
          <SignupForm
            signupSubmit={signupSubmit}
            usernameErrors={usernameErrors}
            credentials={credentials}
            handleChange={handleChange}
            passwordErrors={passwordErrors}
          />
        ) : (
          //LOGIN
          <LoginForm
            loginRequest={loginRequest}
            credentials={credentials}
            handleChange={handleChange}
            passwordErrors={passwordErrors}
          />
        )}
      </div>
      <button className="switch-submit" onClick={toggleSignUp}>
        {isSignUp ? `Switch to Login` : `Switch to Sign Up`}
      </button>
    </>
  )
}
