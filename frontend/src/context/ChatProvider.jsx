import { createContext, useState, useRef, useEffect } from "react";
import * as signalR from "@microsoft/signalr";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userList, setUserList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const connectionRef = useRef(null);

  useEffect(() => {
    if (isLoggedIn && !connectionRef.current) {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl(import.meta.env.VITE_WS_URL + "/chatHub")
        .withAutomaticReconnect()
        .build();

      connectionRef.current = newConnection;

      const startConnection = async () => {
        try {
          await newConnection.start();
          console.log("websocket connected");

          newConnection.on("Connected", (greeting) => {
            console.log(greeting);
          });

          newConnection.on("SendMessage", (message) => {
            console.log("received message:", message);
            setMessageList((list) => [...list, message]);
          });

          newConnection.on("AddUser", (user) => {
            console.log("new user added:", user);
            setUserList((list) => [...list, user]);
          });

          newConnection.on("DeleteMessageById", (messageResponse) => {
            console.log("message deleted in db:", messageResponse);
            setMessageList((list) =>
              list.map((message) => {
                if (message.id === messageResponse.id) {
                  return { ...message, isDeleted: messageResponse.isDeleted };
                }
                return message;
              }),
            );
          });
        } catch (error) {
          console.error("websocket connection error:", error);
        }
      };

      startConnection();
    }

    return () => {
      if (!isLoggedIn && connectionRef.current) {
        connectionRef.current.stop();
        connectionRef.current = null;
      }
    };
  }, [isLoggedIn]);

  const handleLogout = () => {
    setAuth({});
    setIsLoggedIn(false);
    setUserList([]);
    setMessageList([]);
  };

  return (
    <ChatContext.Provider
      value={{
        auth,
        setAuth,
        setIsLoggedIn,
        handleLogout,
        userList,
        setUserList,
        messageList,
        setMessageList,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
