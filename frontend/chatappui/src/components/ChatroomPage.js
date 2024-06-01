// import React, { useEffect, useState } from "react";
// //import {Link} from 'react-router-dom'
// import "../styling/ChatroomPage.css";
// import axios from "axios";
// import ChatroomWebSocket from "./ChatroomWebSocket";

// function ChatroomPage() {
//   const [message, setMessage] = useState("");
//   const [users, setUsers] = useState([]);

//   //const baseUrl = process.env.REACT_APP_API_BASE_URL
//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   useEffect(() => {
//     const getUsersAndMessages = async () => {
//       //const response = await axios.get(`/api/users}`);
//       const response = await axios.get(`${baseUrl}/api/users`);
//       const fetchedUsers = response.data;

//       const updatedUsers = fetchedUsers.map((user) => {
//         return {
//           username: user.username,
//           messages: [],
//         };
//       });
//       setUsers(updatedUsers);
//     };

//     getUsersAndMessages();
//   }, [users]);

//   async function handleSendMessage(event) {
//     event.preventDefault();

//     if (!message.trim()) {
//       return;
//     }

//     const createNewMessage = {
//       text: message,
//     };

//     const response = await axios.post(
//       `${baseUrl}/api/messages}`,
//       createNewMessage
//     );
//     const newMessage = response.data;

//     const updatedUsers = users.map((user) => {
//       if (user.name === "Current User") {
//         return {
//           ...user,
//           messages: [...user.messages, newMessage],
//         };
//       }
//       return user;
//     });

//     setUsers(updatedUsers);
//     setMessage("");
//   }

//   const renderMessage = users.flatMap((user) => {
//     return user.messages.map((message) => (
//       <li className="create--message" key={message.id}>
//         <span className="username">{user.username}</span>
//         <span className="content">{message.message}</span>
//       </li>
//     ));
//   });

//   return (
//     <div className="chatroomPage--container">
//       <ChatroomWebSocket baseUrl={baseUrl} />
//       <span className="active--users">
//         <h2>Active Now</h2>
//         <ul>
//           <li>User A</li>
//           <li>User B</li>
//           <li>User C</li>
//           <li>User D</li>
//         </ul>
//       </span>

//       <span className="chatroom">
//         <ul className="message--container">{renderMessage}</ul>
//       </span>

//       <form className="input--container" onSubmit={handleSendMessage}>
//         <input
//           type="text"
//           placeholder="...enter message here"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button className="submit--message">Send</button>
//       </form>
//     </div>
//   );
// }

export default ChatroomPage;
