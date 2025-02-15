import React, { useCallback, useEffect, useState } from "react"
import useWebSocket from "../hooks/useWebSocket"
import axios from "axios"
import { endpoints } from "./Endpoints"
import { useAuth } from "./AuthProvider"
import "../styling/Chatroom.css"

function Chatroom() {
  const { logOut, user } = useAuth()
  const [usernames, setUsernames] = useState([])
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState({
    message: "",
  })
  const hubConnection = useWebSocket()

  function handleChange(e) {
    const { name, value } = e.target
    setMessageInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  //create useAxios custom hook to make API call
  const getUsers = useCallback(async () => {
    try {
      const res = await axios.get(endpoints.BASE_URI + `users`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      setUsernames(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [user.token])

  //create useAxios custom hook to make API call
  const getMessages = useCallback(async () => {
    try {
      const res = await axios.get(endpoints.BASE_URI + `messages`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      setMessages(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [user.token])

  useEffect(() => {
    if (user.token) {
      getMessages()
      getUsers()
    }
  }, [user.token, getMessages, getUsers, logOut])

  //propagate message to all clients via signalR websocket connection
  const broadcastMessage = async (event) => {
    event.preventDefault()
    const { userId } = user
    const { message } = messageInput
    try {
      if (hubConnection) {
        await hubConnection.invoke(
          "SendMessage",
          // user.userId,
          // messageInput.message
          userId,
          message
        )
      }
      await handleSendMessage(event)
    } catch (error) {
      console.log(error)
    }
  }

  //this is what gets wired up to signalR chatHub
  const handleSendMessage = async (event) => {
    event.preventDefault()
    try {
      await axios.post(
        endpoints.BASE_URI + `messages/broadcast`,
        {
          Text: messageInput.message,
          UserId: user.userId,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      //getMessages()
    } catch (error) {
      console.log(error)
    } finally {
      setMessageInput({ message: "" })
    }
  }

  const renderChatroom = messages.map((message) => {
    const findUserById = usernames.find((user) => user.id === message.userId)
    const username = findUserById ? findUserById.username : "Guest"
    return (
      <li className="create--message" key={message.id}>
        <span className="username">{username}</span>
        <span className="content">{message.text}</span>
      </li>
    )
  })

  return (
    <>
      <button className="logout--button" onClick={() => logOut()}>
        Logout
      </button>
      <div className="chatroomPage--container">
        <span className="active--users">
          <h2>Active Now</h2>
          {/* <ul>{renderActiveUsers}</ul> */}
        </span>
        <span className="chatroom">
          <ul className="message--container">{renderChatroom}</ul>
        </span>
        <form className="input--container" onSubmit={broadcastMessage}>
          <input
            type="text"
            placeholder="...enter message here"
            name="message"
            id="message"
            value={messageInput.message}
            onChange={handleChange}
          />
          <button className="submit--message">Send</button>
        </form>
      </div>
    </>
  )
}

export default Chatroom
