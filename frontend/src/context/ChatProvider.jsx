import { createContext } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  return <ChatContext.Provider value={{}}>{children}</ChatContext.Provider>;
}
