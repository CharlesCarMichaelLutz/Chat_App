import React, { useCallback, useEffect, useState } from "react"
import useWebSocket from "../hooks/useWebSocket"
import axios from "axios"
import { endpoints } from "./Endpoints"
import { useAuth } from "./AuthProvider"
import "../styling/styles.css"

function Chatroom() {
  const { user } = useAuth()
  const [usernameList, setUsernameList] = useState([])
  const [messageList, setMessageList] = useState([])
  const [messageInput, setMessageInput] = useState({
    message: "",
  })
  const [loading, setLoading] = useState(true)
  const { hubConnection } = useWebSocket(setMessageList)

  function handleChange(e) {
    const { name, value } = e.target
    setMessageInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const getUsers = useCallback(async () => {
    try {
      const res = await axios.get(endpoints.BASE_URI + `users`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      setUsernameList(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [user.token])

  const getMessages = useCallback(async () => {
    try {
      const res = await axios.get(endpoints.BASE_URI + `messages`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      setMessageList(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [user.token])

  useEffect(() => {
    if (user.token) {
      setLoading(true)
      getMessages()
      getUsers()
    }
  }, [user.token])

  const broadcastMessage = async (e) => {
    e.preventDefault()
    try {
      if (hubConnection) {
        await hubConnection.invoke(
          "SendMessage",
          user.userId.toString(),
          messageInput.message
        )
      }
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
    } catch (error) {
      console.log(error)
    } finally {
      setMessageInput({ message: "" })
      setLoading(false)
    }
  }

  const deleteMessage = async (messageId) => {
    try {
      if (hubConnection) {
        await hubConnection.invoke("RemoveMessage", messageId)
      }
      await axios.delete(endpoints.BASE_URI + `messages/${messageId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const renderChatroom = messageList.map((message) => {
    const userIdInt = Number(message.userId)
    const matchUser = usernameList.find((usr) => usr.id === userIdInt)
    return (
      <li className="create--message" key={message.id}>
        <span className="username">{matchUser.username}</span>
        <span className="content">{message.text}</span>
        <span>
          {matchUser.username === user.username && (
            <button onClick={() => deleteMessage(message.id)}>Delete</button>
          )}
        </span>
      </li>
    )
  })

  if (loading) {
    return <div>Loading....</div>
  }

  return (
    <>
      <div className="chatroomPage--container">
        <span className="active--users">
          <h2>Active Now</h2>
          {/* {activeUserList.map((username) => {
            if(username.isLoggedIn){
              return username
            }
          })} */}
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

//upon login set an isLoggedIn boolean on the user object to true
// push the user object into an array
//map over the array
//if user.isLoggedIn === true
//render username
//false
// do not render username
