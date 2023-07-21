import React, {useEffect, useState} from 'react'
import {HubConnectionBuilder} from '@microsoft/signalr'

const ChatroomWebSocket = () => {
  const [connection, setConnection] = useState(null)

  const baseWebSocketUrl = process.env.WEB_SOCKET

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
    .withUrl(`${baseWebSocketUrl}/chathub`)
    .build();

    newConnection.on("ReceiveMessage", (user, message) => {
      console.log(`${user}: ${message}`)
    })

    newConnection
      .start()
      .then(() => {
        console.log('Websocket connection successful')
        setConnection(newConnection)
      .catch((error) => {
        console.log(error)
        })
      })

    return () => {
      if (connection) {
        connection.stop()
      }
    }

  }, [baseWebSocketUrl])

  const sendMessage = async (message) => {
    if(connection) {
      try 
      {
        await connection.invoke('SendMessage', 'Current User', message)
      }
      catch(error)
      {
        console.log(error)
      }
    }
  }
  return null
}

export default ChatroomWebSocket