import { useEffect, useState } from "react"
import { HubConnectionBuilder } from "@microsoft/signalr"

export function useWebSocket(setMessageList) {
  const [hubConnection, setHubConnection] = useState(null)

  useEffect(() => {
    const connect = async () => {
      const connection = new HubConnectionBuilder()
        .withUrl(import.meta.env.VITE_WEB_SOCKET)
        .withAutomaticReconnect()
        .build()

      setHubConnection(connection)
      //experiment with passing in an object instead of 3 arguments
      connection.on("PropagateMessageResponse", (id, userId, text) => {
        if (setMessageList) {
          setMessageList((list) => [...list, { id, userId, text }])
        }
      })

      // //working as expected
      // connection.on("CreateMessageResponse", (userId, text) => {
      //   if (setMessageList) {
      //     setMessageList((list) => [...list, { userId, text }])
      //   }
      // })

      // //working as expected
      connection.on("DeleteMessageResponse", (messageId) => {
        if (setMessageList) {
          setMessageList((list) =>
            list.filter((message) => message.id !== messageId)
          )
        }
      })

      // connection.on("DeleteMessage", (messageId) => {
      //   if (setMessageList) {
      //     setMessageList((list) =>
      //       list.filter((message) => message.id !== messageId)
      //     )
      //   }
      // })

      await connection.start()

      return () => {
        connection.stop()
      }
    }

    connect()
  }, [setMessageList])

  return { hubConnection }
}
