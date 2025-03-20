import { useEffect, useState } from "react"
import { HubConnectionBuilder } from "@microsoft/signalr"
import { endpoints } from "../components/Endpoints"

const useWebSocket = (setMessageList) => {
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
          if (setMessageList) {
            setMessageList((messagelist) => [...messagelist, { userId, text }])
          }
        })
      })
      .catch((err) => {
        console.log("connection failed", err)
      })

    return () => {
      connection.stop()
    }
  }, [setMessageList])
  return { hubConnection }
}

export default useWebSocket
