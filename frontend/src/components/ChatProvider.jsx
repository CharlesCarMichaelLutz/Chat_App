 import { useContext, createContext } from 'react'

const ChatContext = createContext()

export function ChatProvider({ children }) {
    return (
        <>
        {children}
        </>
    )
}

export const useChat = () => {
    return useContext(ChatContext)
}