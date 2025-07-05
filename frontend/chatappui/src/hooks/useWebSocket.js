import { useEffect, useState } from "react"
import { HubConnectionBuilder } from "@microsoft/signalr"
import { endpoints } from "../components/Endpoints"

const useWebSocket = (setMessageList) => {
  const [hubConnection, setHubConnection] = useState(null)

  useEffect(() => {
    const connect = async () => {
      const connection = new HubConnectionBuilder()
        .withUrl(endpoints.WEB_SOCKET)
        .withAutomaticReconnect()
        .build()

      setHubConnection(connection)

      //working as expected

      // connection.on("CreateMessageResponse", (id, userId, text) => {
      //   if (setMessageList) {
      //     setMessageList((list) => [...list, { id, userId, text }])
      //   }
      // })

      connection.on("CreateMessageResponse", (userId, text) => {
        if (setMessageList) {
          setMessageList((list) => [...list, { userId, text }])
        }
      })

      connection.on("DeleteMessageResponse", (messageId) => {
        if (setMessageList) {
          setMessageList((list) =>
            list.filter((message) => message.id !== messageId)
          )
        }
      })

      await connection.start()

      return () => {
        connection.stop()
      }
    }

    connect()
  }, [setMessageList])

  return { hubConnection }
}

export default useWebSocket
