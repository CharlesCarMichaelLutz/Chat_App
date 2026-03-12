import { createContext, useState, useRef, useEffect } from "react";
import { baseApi } from "../api/base";
import { useNavigate } from "react-router-dom";
import * as signalR from "@microsoft/signalr";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
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
      if (!connectionRef.current) return;

      try {
        await connection.start();
        console.log("websocket connected");

        //register listeners
        connection.on("Connected", (greeting) => {
          console.log(greeting);
        });
      } catch (error) {
        console.error("websocket connection error:", error);
      }
    };

    startConnection();
  }, [auth.accessToken]);

  //function call Api for the guest user
  const guestLogin = async (credentials) => {
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

  //patch delete message

  //post create message

  useEffect(() => {
    console.log("auth changed, effect ran:", auth);
  }, [auth]);

  //pass down context values to children
  return (
    <ChatContext.Provider
      value={{
        auth,
        setAuth,
        guestLogin,
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
