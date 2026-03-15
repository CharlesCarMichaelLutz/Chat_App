import { createContext, useState, useRef, useEffect } from "react";
import { baseApi } from "../api/base";
import { useNavigate } from "react-router-dom";
import * as signalR from "@microsoft/signalr";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userList, setUserList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const connectionRef = useRef(null);
  const navigate = useNavigate();

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

          // Register listeners
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

  //call Api for login
  const userLogin = async (credentials) => {
    try {
      const response = await baseApi.post("login", {
        Username: credentials?.username,
        Password: credentials?.password,
      });
      setAuth(response.data);
      setIsLoggedIn(true);
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
      setIsLoggedIn(true);
      console.log("set user:", auth);
      navigate("/chatroom");
    } catch (error) {
      console.error(error);
    }
  };

  //call Api for logout
  const userLogout = () => {
    setAuth({});
    setIsLoggedIn(false);
    setUserList([]);
    setMessageList([]);
    navigate("/");
  };

  return (
    <ChatContext.Provider
      value={{
        auth,
        setAuth,
        userLogin,
        userRegister,
        userLogout,
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
