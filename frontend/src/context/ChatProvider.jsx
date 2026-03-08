import { createContext, useState, useEffect } from "react";
import { baseApi } from "../api/base";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  //persist the user
  const [auth, setAuth] = useState({});

  const refresh = async () => {
    const response = await baseApi.post("refresh-token", {});
    setAuth((prev) => {
      console.log("prev:", prev);
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };

  //function call Api for the guest user
  const guestLogin = async (credentials) => {
    try {
      const response = await baseApi.post("login", {
        Username: credentials?.username,
        Password: credentials?.password,
      });
      setAuth(response.data);
      console.log("user:", auth);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("user:", auth);
  }, [auth]);

  //function call Api for register

  //function call Api for login

  //function call Api for logout

  //pass down context values to children

  return (
    <ChatContext.Provider value={{ auth, setAuth, guestLogin, refresh }}>
      {/* <ChatContext.Provider value={{ auth, setAuth, guestLogin }}> */}
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
