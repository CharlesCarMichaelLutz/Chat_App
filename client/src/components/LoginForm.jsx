// import React from "react"

// export function LoginForm({
//   isSignup,
//   setIsSignup,
//   credentials,
//   handleSubmit,
//   handleChange,
// }) {
//   function toggleSignUp() {
//     setIsSignup((prev) => !prev)
//   }

//   return (
//     <>
//       <fieldset>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault()
//             handleSubmit()
//           }}
//         >
//           <legend>{isSignup ? `Create account` : `Login`}</legend>
//           <label htmlFor="username">
//             Username
//             <input
//               required
//               type="text"
//               id="username"
//               name="username"
//               placeholder="...enter a username"
//               value={credentials.username}
//               onChange={handleChange}
//             />
//           </label>
//           <label htmlFor="password">
//             Password
//             <input
//               required
//               type="password"
//               id="passsword"
//               name="password"
//               placeholder="...enter a password"
//               value={credentials.password}
//               onChange={handleChange}
//             />
//           </label>
//           <button className="login">{isSignup ? `Sign Up` : `Login`}</button>
//         </form>
//       </fieldset>

//       <button className="switch-submit" onClick={toggleSignUp}>
//         {isSignup ? `Switch to Login` : `Switch to Sign Up`}
//       </button>
//     </>
//   )
// }
