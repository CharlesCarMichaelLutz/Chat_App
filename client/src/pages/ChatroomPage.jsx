import React, { useState } from "react"
import { useAuth } from "../components/AuthProvider"

export function ChatroomPage() {
  const { user, usernameList, messageList, hubConnection } = useAuth()

  const [messageInput, setMessageInput] = useState({
    message: "",
  })

  function handleChange(e) {
    const { name, value } = e.target
    setMessageInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

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

  //maybe this can be omitted because it's being called in Authprovider?
  // useEffect(() => {
  //   if (hubConnection && connected) {
  //     getData()
  //   }
  // }, [])

  const renderUsersList = usernameList?.map((user) => {
    return (
      <li key={user.id}>
        <span className="username">{user.username}</span>
      </li>
    )
  })

  const renderChatroom = messageList?.map((message) => {
    const matchUser = usernameList?.find((usr) => usr.id === message.userId)
    // console.log("message:", message)
    // console.log("matched user:", matchUser)
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
              data-aria-label="delete button"
              onClick={() => propagateDeleteMessage(message.id)}
            >
              <span className="bi bi-trash"></span>
            </button>
          )}
        </span>
      </li>
    )
  })

  return (
    <>
      <div className="container chatroom-wrapper">
        <div className="row-one">
          <section className="active-users">
            <h2>Rabbits</h2>
            <ul className="active-users-list">{renderUsersList}</ul>
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
            <button data-aria-label="send message button">
              <span className="bi bi-send"></span>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
