import { useEffect, useState } from "react"
import { HubConnectionBuilder } from "@microsoft/signalr"
import { endpoints } from "../components/Endpoints"

const useWebSocket = (setMessages) => {
  const [hubConnection, setHubConnection] = useState(null)

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(endpoints.WEB_SOCKET)
      .withAutomaticReconnect()
      .build()
    setHubConnection(connection)

    connection
      .start()
      .then(() => {
        connection.on("ReceiveMessage", (userId, text) => {
          if (setMessages) {
            setMessages((messagelist) => [...messagelist, { userId, text }])
          }
        })
      })
      .catch((err) => {
        console.log("connection failed", err)
      })

    return () => {
      connection.stop()
    }
  }, [setMessages])
  return { hubConnection }
}

export default useWebSocket
