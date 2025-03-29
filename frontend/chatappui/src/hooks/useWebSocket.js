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

      connection.on("ReceiveMessage", (userId, text) => {
        if (setMessageList) {
          setMessageList((list) => [...list, { userId, text }])
        }
      })

      connection.on("MessageDeleted", (messageId) => {
        if (setMessageList) {
          setMessageList((list) => list.filter((message) => message.id !== messageId))
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

// import { useEffect, useState } from "react"
// import { HubConnectionBuilder } from "@microsoft/signalr"
// import { endpoints } from "../components/Endpoints"

// const useWebSocket = (setMessageList) => {
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
//         connection.on("ReceiveMessage", (userId, text) => {
//           if (setMessageList) {
//             setMessageList((list) => [...list, { userId, text }])
//           }
//         })
//       })
//       .catch((err) => {
//         console.log("connection failed", err)
//       })

//     connection
//       .start()
//       .then(() => {
//         connection.on("MessageDeleted", (messageId) => {
//           if (setMessageList) {
//             setMessageList((list) => {
//               list.filter((message) => message.id !== messageId)
//             })
//           }
//         })
//       })
//       .catch((err) => {
//         console.log("connection failed", err)
//       })

//     return () => {
//       connection.stop()
//     }
//   }, [setMessageList])
//   return { hubConnection }
// }

// export default useWebSocket
