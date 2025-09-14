import { useState, useContext, createContext, useEffect } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"
import { HubConnectionBuilder } from "@microsoft/signalr"

const AuthContext = createContext()

const USER = "USER"

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useLocalStorage(USER, "")
  const [isSignUp, setIsSignup] = useState(true)
  const [usernameList, setUsernameList] = useState([])
  const [messageList, setMessageList] = useState([])
  const [hubConnection, setHubConnection] = useState(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    if (user.token) {
      const connect = async () => {
        //console.log("JWT:", user.token)
        const connection = new HubConnectionBuilder()
          .withUrl(import.meta.env.VITE_WEB_SOCKET, {
            accessTokenFactory: () => {
              return user.token
            },
          })
          .withAutomaticReconnect()
          .build()

        connection.onreconnecting((error) => {
          console.assert(error === "reconnecting")
        })

        connection.onreconnected((connectionId) => {
          console.assert(connectionId !== null)
        })

        connection.on("PropagateMessageResponse", (id, userId, text) => {
          if (setMessageList) {
            setMessageList((list) => [...list, { id, userId, text }])
          }
        })

        connection.on("DeleteMessageResponse", (messageId) => {
          if (setMessageList) {
            setMessageList((list) =>
              list.filter((message) => message.id !== messageId)
            )
          }
        })

        connection.on("PropagateMessageListResponse", (response) => {
          if (setMessageList) {
            //console.log("message list:", response)
            setMessageList(response)
          }
        })

        connection.on("PropagateUserListResponse", (response) => {
          if (setUsernameList) {
            console.log("Received user list:", response)
            setUsernameList(response)
          }
        })

        try {
          connection.start().then(() => {
            console.log("Websocket connection started successfully")
            setHubConnection(connection)
            setConnected(true)
          })
          //console.log("connection started")
        } catch (err) {
          console.error("error starting signalR:", err)
        }

        return () => {
          connection.stop()
        }
      }

      connect()
    }
  }, [user.token])

  useEffect(() => {
    if (connected) {
      getData()
    }
  }, [connected])

  function toggleSignUp() {
    setIsSignup((prev) => !prev)
  }

  function handleLogout() {
    setUser({})
    localStorage.clear()
    navigate("/")
  }

  async function getData() {
    try {
      if (hubConnection && connected) {
        await hubConnection.invoke("GetMessageList")
        await hubConnection.invoke("GetUserList")
      } else {
        console.log("not connected yet")
      }
    } catch (err) {
      console.error("Error in getData:", err)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isSignUp,
        toggleSignUp,
        usernameList,
        messageList,
        handleLogout,
        getData,
        hubConnection,
        connected,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
