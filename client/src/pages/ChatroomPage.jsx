import React, { useCallback, useEffect, useState } from "react"
import { useWebSocket } from "../hooks/useWebSocket"
import { useAuth } from "../components/AuthProvider"
import { baseApi } from "../api/base"

export function ChatroomPage() {
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

  const fetchData = useCallback(async () => {
    try {
      const res1 = await baseApi.get(`users`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      setUsernameList(res1.data)
      const res2 = await baseApi.get(`messages`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      setMessageList(res2.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [user.token])

  useEffect(() => {
    if (user.token) {
      setLoading(true)
      fetchData()
    }
  }, [user.token])

  const propagateCreateMessage = async (e) => {
    e.preventDefault()
    try {
      if (hubConnection) {
        await hubConnection.invoke(
          "SendMessage",
          user.userId,
          messageInput.message
        )
      }
    } catch (error) {
      console.log(error)
    } finally {
      setMessageInput({ message: "" })
      setLoading(false)
    }
  }

  const propagateDeleteMessage = async (messageId) => {
    try {
      if (hubConnection) {
        await hubConnection.invoke("DeleteMessage", messageId)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const renderUsersList = usernameList.map((user) => {
    return (
      <li key={user.id}>
        <span className="username">{user.username}</span>
      </li>
    )
  })

  const renderChatroom = messageList.map((message) => {
    const matchUser = usernameList.find((usr) => usr.id === message.userId)
    return (
      <li key={message.id}>
        <span className="username">
          {matchUser ? matchUser.username : "Unknown"}
        </span>
        {" : "}
        <span className="message">{message.text}</span>
        <span>
          {matchUser && matchUser.username === user.username && (
            <button
              className="delete-button"
              onClick={() => propagateDeleteMessage(message.id)}
            >
              Delete
            </button>
          )}
        </span>
      </li>
    )
  })

  //swap out loading for state in useNavigation
  if (loading) {
    return <div>Loading....</div>
  }

  return (
    <>
      <div className="chatroom-wrapper">
        <div className="row-one">
          <section className="active-users">
            <h2>Rabbits</h2>
            <ul class="active-users-list">
              {renderUsersList}
              {/* <li>User 1</li>
              <li>Tim</li>
              <li>User 2</li>
              <li>Amy</li>
              <li>User 3</li>
              <li>Bill</li>
              <li>User 4</li>
              <li>Sarah</li>
              <li>User 5</li>
              <li>Hope</li> */}
            </ul>
            {/* {activeUserList.map((username) => {
            if (username.isLoggedIn) {
              return username
            }
          })} */}
          </section>
          <section className="chatroom-data">
            <ul>{renderChatroom}</ul>
          </section>
        </div>
        <div className="row-two">
          <form onSubmit={propagateCreateMessage}>
            <input
              type="text"
              placeholder="...enter message here"
              name="message"
              id="message"
              value={messageInput.message}
              onChange={handleChange}
            />
            <button>Send</button>
          </form>
        </div>
      </div>
    </>
  )
}
