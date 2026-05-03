import React, { useContext } from "react";
import { useChatScroll } from "../hooks/useChatScroll";
import ChatContext from "../context/ChatProvider";
import Message from "./Message";

const ChatContent = () => {
  const { auth, messageList } = useContext(ChatContext);
  const { ref } = useChatScroll(messageList.length);

  return (
    <>
      <div className="chat-content" ref={ref}>
        <ul className="message-list">
          {messageList
            .filter((message) => !message.isDeleted)
            .map((message) => (
              <Message message={message} auth={auth} />
            ))}
        </ul>
      </div>
    </>
  );
};

export default ChatContent;
