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

      connection.on("CreateMessageResponse", (id, userId, text) => {
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
