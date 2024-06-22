import React, { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { endpoints } from "./Endpoints"
import { useAuth } from "../hooks/AuthProvider"
import "../styling/Chatroom.css"

function Chatroom() {
  const { logOut, token } = useAuth()
  const [message, setMessage] = useState("")
  const [users, setUsers] = useState([])
  const [chatroom, setChatroom] = useState([])

  function handleChange(e) {
    const { name, value } = e.target
    setMessage((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const getUsers = useCallback(async () => {
    try {
      const res = await axios.get(endpoints.BASE_URI + `users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUsers(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [token])

  const getChatroom = useCallback(async () => {
    try {
      const res = await axios.get(endpoints.BASE_URI + `messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setChatroom(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [token])

  useEffect(() => {
    getChatroom()
    getUsers()
  }, [getChatroom, getUsers])

  async function handleSubmitMessage() {
    //Call post /messages endpoint from server
    try {
      const res = await axios.post(
        `messages`,
        {
          UserId: users.UserId,
          Text: message,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      console.log(res)
    } catch (error) {
      console.log(error)
    } finally {
      setMessage("")
    }
  }

  const renderChatroom = chatroom.map((messageDetail) => {
    return (
      <li className="create--message" key={messageDetail.id}>
        <span className="username">{messageDetail.userId}</span>
        <span className="content">{messageDetail.text}</span>
      </li>
    )
  })

  const renderActiveUsers = users.map((user) => {
    return <li key={user.id}>{user.username}</li>
  })

  return (
    <>
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
            value={message}
            onChange={handleChange}
          />
          <button className="submit--message">Send</button>
        </form>
        <button className="logout--button" onClick={logOut}>
          XXXXXX
        </button>
      </div>
    </>
  )
}

export default Chatroom
