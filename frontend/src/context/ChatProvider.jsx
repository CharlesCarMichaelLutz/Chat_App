import { createContext, useState, useEffect } from "react";
import { baseApi } from "../api/base";
//import useRefreshToken from "../hooks/useRefreshToken";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  //const refresh = useRefreshToken();

  //persist the user
  const [auth, setAuth] = useState({});

  //function call Api for the guest user
  const guestLogin = async (credentials) => {
    try {
      const response = await baseApi.post(
        "login",
        {
          Username: credentials?.username,
          Password: credentials?.password,
        },
        // { withCredentials: true },
      );
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
    //<ChatContext.Provider value={{ auth, setAuth, guestLogin, refresh }}>
    <ChatContext.Provider value={{ auth, setAuth, guestLogin }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
