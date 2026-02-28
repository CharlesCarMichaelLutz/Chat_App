import { useContext } from "react";
import { ChatContext } from "../context/ChatProvider";

export const useChat = () => {
    return useContext(ChatContext)
}