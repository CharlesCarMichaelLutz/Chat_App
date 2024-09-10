import React, { useEffect, useState } from "react"
import { HubConnectionBuilder } from "@microsoft/signalr"

const ChatroomWebSocket = () => {
  const [hubConnection, setHubConnection] = useState(null)

  const baseWebSocketUrl = process.env.WEB_SOCKET

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${baseWebSocketUrl}/chathub`)
      //.withUrl(`/chatHub`)
      .withAutomaticReconnect()
      .build()

    newConnection.on("ReceiveMessage", (user, message) => {
      console.log(`${user}: ${message}`)
    })

    newConnection.start().then(() => {
      console.log("Websocket connection successful")
      setHubConnection(newConnection).catch((error) => {
        console.log(error)
      })
    })

    return () => {
      if (hubConnection) {
        hubConnection.stop()
      }
    }
  }, [baseWebSocketUrl])

  const sendMessage = async (message) => {
    if (hubConnection) {
      try {
        await hubConnection.invoke("SendMessage", "Current User", message)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return null
}

export default ChatroomWebSocket
