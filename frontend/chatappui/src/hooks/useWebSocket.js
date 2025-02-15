// import { useEffect, useState } from "react"
// import { HubConnectionBuilder } from "@microsoft/signalr"
// import { endpoints } from "../components/Endpoints"

// const useWebSocket = () => {
//   const [hubConnection, setHubConnection] = useState(null)

//   useEffect(() => {
//     const connection = new HubConnectionBuilder()
//       .withUrl(endpoints.WEB_SOCKET)
//       .withAutomaticReconnect()
//       .build()

//     setHubConnection(connection)

//     connection
//       .start()
//       .then(() => {
//         console.log("successful connection")

//         connection.on("ReceiveMessage", (msg) => {
//           console.log(`message from the server${msg}`)
//         })
//       })
//       .catch((err) => {
//         console.log("connection failed", err)
//       })

//     return () => {
//       if (hubConnection) {
//         hubConnection.stop()
//       }
//     }
//   }, [])
// }

// export default useWebSocket

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

    connection
      .start()
      .then(() => {
        console.log("successful connection")

        connection.on("ReceiveMessage", (userId, text) => {
          console.log(`${userId}sent${text}`)
          if (setMessages) {
            setMessages((messagelist) => [...messagelist, { userId, text }])
          }
        })
      })
      .catch((err) => {
        console.log("connection failed", err)
      })
    setHubConnection(connection)

    return () => {
      connection.stop()
    }
  }, [setMessages])
  return hubConnection
}

export default useWebSocket
