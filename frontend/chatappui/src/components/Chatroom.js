import React, { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { endpoints } from "./Endpoints"
import { useAuth } from "./AuthProvider"
import "../styling/Chatroom.css"

function Chatroom() {
  const { logOut, loggedInUsers, currentUser } = useAuth()
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  const [input, setInput] = useState({
    message: "",
  })

  function handleChange(e) {
    const { name, value } = e.target
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const curr = loggedInUsers.find((user) => user.userId === currentUser)

  console.log(curr)

  const getUsers = useCallback(async () => {
    try {
      const res = await axios.get(endpoints.BASE_URI + `users`, {
        headers: { Authorization: `Bearer ${curr.token}` },
      })
      setUsers(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [curr.token])

  const getMessages = useCallback(async () => {
    try {
      const res = await axios.get(endpoints.BASE_URI + `messages`, {
        headers: { Authorization: `Bearer ${curr.token}` },
      })
      setMessages(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [curr.token])

  useEffect(() => {
    getMessages()
    getUsers()
  }, [getMessages, getUsers])

  async function handleSubmitMessage(e) {
    e.preventDefault()
    try {
      const res = await axios.post(
        endpoints.BASE_URI + `messages`,
        {
          Text: input.message,
          UserId: currentUser,
        },
        {
          headers: { Authorization: `Bearer ${curr.token}` },
        }
      )
      getMessages()
      console.log(res)
    } catch (error) {
      console.log(error)
    } finally {
      setInput({ message: "" })
    }
  }

  const renderChatroom = messages.map((message) => {
    const findUserById = users.find((user) => user.id === message.userId)
    const username = findUserById ? findUserById.username : "Guest"
    return (
      <li className="create--message" key={message.id}>
        <span className="username">{username}</span>
        <span className="content">{message.text}</span>
      </li>
    )
  })

  const renderActiveUsers = loggedInUsers.map((user) => {
    return <li key={user.userId}>{user.username}</li>
  })

  return (
    <>
      <button className="logout--button" onClick={() => logOut(currentUser)}>
        Logout
      </button>
      <div className="chatroomPage--container">
        {/* <ChatroomWebSocket baseUrl={baseUrl} /> */}
        <span className="active--users">
          <h2>Active Now</h2>
          <ul>{renderActiveUsers}</ul>
        </span>

        <span className="chatroom">
          <ul className="message--container">{renderChatroom}</ul>
        </span>

        <form className="input--container" onSubmit={handleSubmitMessage}>
          <input
            type="text"
            placeholder="...enter message here"
            name="message"
            id="message"
            value={input.message}
            onChange={handleChange}
          />
          <button className="submit--message">Send</button>
        </form>
      </div>
    </>
  )
}

export default Chatroom
