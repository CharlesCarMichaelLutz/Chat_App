import React from "react"
import { useEffect, useState } from "react"
import { getMessages, getUsers } from "../api/chatroom"
//import { MessageForm } from "../components/MessageForm"

export function Chatroom({ user }) {
  const [usernameList, setUsernameList] = useState([])
  const [messageList, setMessageList] = useState([])

  console.log("rendered")

  useEffect(() => {
    // const fetchData = async () => {
    //   if (user.token)
    //     try {
    //       const usersResponse = await getUsers(user.token)
    //       const messageResponse = await getMessages(user.token)

    //       setUsernameList(usersResponse.data)
    //       setMessageList(messageResponse.data)
    //     } catch (error) {
    //       console.error(error)
    //     }
    // }
    console.log("onMount")
    fetchData()
  }, [user.token])

  const fetchData = async () => {
    if (user.token)
      try {
        const usersResponse = await getUsers(user.token)
        const messageResponse = await getMessages(user.token)

        setUsernameList(usersResponse.data)
        setMessageList(messageResponse.data)
      } catch (error) {
        console.error(error)
      }
  }

  const renderChatroom = messageList.map((msg) => {
    const matchUser = usernameList.find((usr) => usr.id === msg.userId)
    return (
      <li key={msg.id}>
        <strong>{matchUser ? matchUser.username : "Unknown"}</strong>
        <span>{msg.text}</span>
        <button>X</button>
      </li>
    )
  })

  return (
    <>
      <div>{<ul class="chatroom-list">{renderChatroom}</ul>}</div>
      {/* <MessageForm /> */}
    </>
  )
}
