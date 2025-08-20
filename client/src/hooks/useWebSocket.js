import { useEffect, useState } from "react"
import { HubConnectionBuilder } from "@microsoft/signalr"

export function useWebSocket({ setMessageList }) {
  const [hubConnection, setHubConnection] = useState(null)

  useEffect(() => {
    const connect = async () => {
      const connection = new HubConnectionBuilder()
        .withUrl(import.meta.env.VITE_WEB_SOCKET)
        .withAutomaticReconnect()
        .build()

      setHubConnection(connection)

      connection.on("PropagateMessageResponse", (id, userId, text) => {
        if (setMessageList) {
          setMessageList((list) => [...list, { id, userId, text }])
        }
        //if(usernam)
        //check if usernamelist.find((usr) => usr.id !== user.id)
        //call fetchData
      })

      connection.on("DeleteMessageResponse", (messageId) => {
        if (setMessageList) {
          setMessageList((list) =>
            list.filter((message) => message.id !== messageId)
          )
        }
      })

      try {
        await connection.start()
      } catch (err) {
        console.error("error starting signalR:", err)
      }

      return () => {
        connection.stop()
      }
    }

    connect()
  }, [setMessageList])

  return { hubConnection }
}
