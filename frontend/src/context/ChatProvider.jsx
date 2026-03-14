import { createContext, useState, useRef, useEffect } from "react";
import { baseApi } from "../api/base";
import { useNavigate } from "react-router-dom";
import * as signalR from "@microsoft/signalr";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  //const [auth, setAuth] = useState(null);
  const [userList, setUserList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const connectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.accessToken) return;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_WS_URL + "/chatHub")
      .withAutomaticReconnect()
      .build();

    connectionRef.current = newConnection;

    return () => {
      if (newConnection) {
        newConnection.stop();
        connectionRef.current = null;
      }
    };
  }, [auth.accessToken]);

  useEffect(() => {
    const startConnection = async () => {
      const connection = connectionRef.current;
      //if (!connectionRef.current) return;
      if (!connection) return;

      try {
        await connection.start();
        console.log("websocket connected");

        //register listeners
        connection.on("Connected", (greeting) => {
          console.log(greeting);
        });
        //broadcast delete message on messageList

        //broadcast create message on messageList
        connection.on("SendMessage", (message) => {
          console.log("received message:", message);
          setMessageList((list) => [...list, message]);
        });

        //broadcast add user on userList
      } catch (error) {
        console.error("websocket connection error:", error);
      }
    };

    startConnection();
  }, [auth.accessToken]);

  //call Api for login
  const userLogin = async (credentials) => {
    try {
      const response = await baseApi.post("login", {
        Username: credentials?.username,
        Password: credentials?.password,
      });
      setAuth(response.data);
      console.log("set user:", auth);
      navigate("/chatroom");
    } catch (error) {
      console.error(error);
    }
  };

  //call Api for register
  const userRegister = async (credentials) => {
    try {
      const response = await baseApi.post("signup", {
        Username: credentials?.username,
        Password: credentials?.password,
      });
      setAuth(response.data);
      console.log("set user:", auth);
      navigate("/chatroom");
    } catch (error) {
      console.error(error);
    }
  };

  //call Api for logout

  //Is this necessary
  //given that we don't want to trigger a re-render when auth changes every time
  // useEffect(() => {
  //   console.log("auth changed, effect ran:", auth);
  // }, [auth]);

  //pass down context values to children
  return (
    <ChatContext.Provider
      value={{
        auth,
        setAuth,
        userLogin,
        userRegister,
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
