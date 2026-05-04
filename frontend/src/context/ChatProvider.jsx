import {
  createContext,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import * as signalR from "@microsoft/signalr";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userList, setUserList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const connectionRef = useRef(null);

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useLayoutEffect(() => {
    document.documentElement.className = darkMode;
  }, [darkMode]);

  const toggleTheme = () => {
    const newTheme = darkMode === "light" ? "dark" : "light";
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme);
  };

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

          newConnection.on("SendMessage", (message) => {
            setMessageList((list) => [...list, message]);
          });

          newConnection.on("AddUser", (user) => {
            setUserList((list) => [...list, user]);
          });

          newConnection.on("DeleteMessageById", (messageResponse) => {
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
        darkMode,
        toggleTheme,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
