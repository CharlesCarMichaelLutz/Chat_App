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
  // const getUsers = useCallback(async () => {
  //   try {
  //     const res = await axios.get(endpoints.BASE_URI + `users`, {
  //       headers: { Authorization: `Bearer ${user.token}` },
  //     })
  //     setUsernameList(res.data)
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }, [user.token])

  // const getMessages = useCallback(async () => {
  //   try {
  //     const res = await axios.get(endpoints.BASE_URI + `messages`, {
  //       headers: { Authorization: `Bearer ${user.token}` },
  //     })
  //     setMessageList(res.data)
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }, [user.token])

  //combine both requests into a single useCallback
  const fetchData = useCallback(async () => {
    try {
      const res1 = await axios.get(endpoints.BASE_URI + `users`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      setUsernameList(res1.data)
      const res2 = await axios.get(endpoints.BASE_URI + `messages`, {
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
      // getUsers()
      // getMessages()
      fetchData()
    }
  }, [user.token])

  const propagateSendMessage = async (e) => {
    e.preventDefault()
    try {
      if (hubConnection) {
        await hubConnection.invoke(
          "SendMessage",
          // user.userId.toString(),
          user.userId,
          messageInput.message
        )
      }
      await axios.post(
        endpoints.BASE_URI + `messages/broadcast`,
        {
          UserId: user.userId,
          Text: messageInput.message,
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

  const propagateDeleteMessage = async (messageId) => {
    try {
      if (hubConnection) {
        await hubConnection.invoke("DeleteMessage", messageId)
      }
      await axios.delete(endpoints.BASE_URI + `messages/${messageId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
    } catch (error) {
      console.log(error)
    }
  }

  // const renderChatroom = messageList.map((message) => {
  //   const userIdInt = Number(message.userId)
  //   const matchUser = usernameList.find((usr) => usr.id === userIdInt)
  //   return (
  //     <li className="create--message" key={message.id}>
  //       <span className="username">
  //         {matchUser ? matchUser.username : "Unknown"}
  //       </span>
  //       <span className="content">{message.text}</span>
  //       <span>
  //         {matchUser && matchUser.username === user.username && (
  //           <button onClick={() => deleteMessage(message.id)}>Delete</button>
  //         )}
  //       </span>
  //     </li>
  //   )
  // })

  const renderChatroom = messageList.map((message) => {
    // const userIdInt = Number(message.userId)
    // const matchUser = usernameList.find((usr) => usr.id === userIdInt)
    const matchUser = usernameList.find((usr) => usr.id === message.userId)
    return (
      <li className="create--message" key={message.id}>
        <span className="username">
          {matchUser ? matchUser.username : "Unknown"}
        </span>
        <span className="content">{message.text}</span>
        <span>
          {matchUser && matchUser.username === user.username && (
            <button onClick={() => propagateDeleteMessage(message.id)}>
              Delete
            </button>
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
        {/* <span className="active--users">
          <h2>Active Now</h2>
           {activeUserList.map((username) => {
            if(username.isLoggedIn){
              return username
            }
          })}
        </span>  */}
        <span className="chatroom">
          <ul className="message--container">{renderChatroom}</ul>
        </span>
        <form className="input--container" onSubmit={propagateSendMessage}>
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
