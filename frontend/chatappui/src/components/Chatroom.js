// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import { endpoints } from "./Endpoints"
// import { useAuth } from "../hooks/AuthProvider"

// function Chatroom() {
//   const { logOut, user, token } = useAuth()
//   const [message, setMessage] = useState("")
//   const [chatroom, setChatroom] = useState([])

//   useEffect(() => {
//     getChatroom()
//   }, [chatroom])

//   function handleChange(e) {
//     const { name, value } = e.target
//     setMessage((prev) => {
//       return { ...prev, [name]: value }
//     })
//   }

//   async function getChatroom() {
//     //Call get /messages endpoint from server
//     try {
//       const res = await axios.get(endpoints.BASE_URI + `messages`)
//       setChatroom(res)
//     } catch (error) {
//       console.log(error)
//   }

//   async function handleSubmitMessage() {
//     //Call post /messages endpoint from server
//     try {
//       const res = await axios.post(endpoints.BASE_URI + `messages`, {
//         userId: "",
//         text: message,
//       })
//       console.log(res)
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setMessage("")
//     }
//   }

//   const renderChatroom = chatroom.map((user) => {
//     return (
//       <li className="create--message" key={user.id}>
//          <span className="username">{user.username}</span>
//          <span className="content">{message.message}</span>
//        </li>
//   })

//   return (
//     <>
//       <div className="chatroomPage--container">
//         {/* <ChatroomWebSocket baseUrl={baseUrl} /> */}
//         <span className="active--users">
//           <h2>Active Now</h2>
//           <ul>
//             <li>{user}</li>
//           </ul>
//         </span>

//         <span className="chatroom">
//           <ul className="message--container">{chatroom}</ul>
//         </span>

//         <form className="input--container" onSubmit={handleSendMessage}>
//           <input
//             type="text"
//             placeholder="...enter message here"
//             value={message}
//             onChange={handleChange}
//           />
//           <button className="submit--message">Send</button>
//         </form>
//       </div>
//     </>
//   )
// }

// export default Chatroom
