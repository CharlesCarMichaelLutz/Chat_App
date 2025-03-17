import { useEffect, useState } from "react"
import { HubConnectionBuilder } from "@microsoft/signalr"
import { endpoints } from "../components/Endpoints"
//import { baseApi } from "../api/base"

const useWebSocket = (setMessages) => {
  const [hubConnection, setHubConnection] = useState(null)

  useEffect(() => {
    //1 Establish signalR connection
    const connection = new HubConnectionBuilder()
      .withUrl(endpoints.WEB_SOCKET)
      //.withUrl(process.env.REACT_APP_HUB)
      .withAutomaticReconnect()
      .build()
    setHubConnection(connection)

    //2|3 Load users/messages from the data base

    connection
      .start()
      .then(() => {
        console.log("successful connection")

        //this fires off and prints in the console

        //4 start listening for new messages
        connection.on("ReceiveMessage", (userId, text) => {
          if (setMessages) {
            //this is firing as expected
            console.log(
              `4 Rabbit Chat user:${userId} sent ${text} in the chatroom`
            )
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

// import { useEffect, useState } from "react"
// import { HubConnectionBuilder } from "@microsoft/signalr"
// import { endpoints } from "../components/Endpoints"

// const useWebSocket = ({ setMessages }) => {
//   const [hubConnection, setHubConnection] = useState(null)

//   useEffect(() => {
//     //1 Establish signalR connection
//     const connection = new HubConnectionBuilder()
//     console
//       .log("1", connection)
//       .withUrl(endpoints.WEB_SOCKET)
//       .withAutomaticReconnect()
//       .build()
//     setHubConnection(connection)

//     //2|3 Load users/messages from the data base

//     connection
//       .start()
//       .then(() => {
//         console.log("successful connection")

//         //this fires off and prints in the console

//         //4 start listening for new messages
//         connection.on("ReceiveMessage", (userId, text) => {
//           console.log(
//             `4 Rabbit Chat user:${userId} sent ${text} in the chatroom`
//           )

//           if (setMessages) {
//             setMessages((messagelist) => [...messagelist, { userId, text }])
//           }
//         })
//       })
//       .catch((err) => {
//         console.log("connection failed", err)
//       })

//     return () => {
//       connection.stop()
//     }
//   }, [setMessages])
//   return { hubConnection }
// }

// export default useWebSocket
