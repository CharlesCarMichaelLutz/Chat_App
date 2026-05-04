import { useChatScroll } from "../hooks/useChatScroll";
import ChatContext from "../context/ChatProvider";
import { useChat } from "../hooks/useChat";
import Message from "./Message";

const ChatContent = () => {
  const { auth, messageList } = useChat();
  const { ref } = useChatScroll(messageList.length);

  return (
    <>
      <div className="chat-content" ref={ref}>
        <ul className="message-list">
          {messageList
            .filter((message) => !message.isDeleted)
            .map((message) => (
              <Message key={message.id} message={message} auth={auth} />
            ))}
        </ul>
      </div>
    </>
  );
};

export default ChatContent;
