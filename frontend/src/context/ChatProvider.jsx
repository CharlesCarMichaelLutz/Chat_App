import { createContext, useState, useEffect } from "react";
import { baseApi } from "../api/base";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [userList, setUserList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const navigate = useNavigate();

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

  //delete message

  //create message

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
