import { useEffect } from "react";
import ChatContext from "../context/ChatProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import UserList from "../components/UserList";
import ChatContent from "../components/ChatContent";
import SendMessageForm from "../components/SendMessageForm";
import { useChat } from "../hooks/useChat";

export const Chatroom = () => {
  const { auth, userList, setUserList, setMessageList, darkMode } = useChat();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const controller = new AbortController();

    const getUserList = async () => {
      try {
        const response = await axiosPrivate.get("users", {
          signal: controller.signal,
        });
        setUserList(response.data);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          console.error(error);
        }
      }
    };
    getUserList();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const getMessageList = async () => {
      try {
        const response = await axiosPrivate.get("messages", {
          signal: controller.signal,
        });
        setMessageList(response.data);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          console.error(error);
        }
      }
    };
    getMessageList();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <main className="chatroom-wrapper">
        <UserList userList={userList} />
        <section className="chat-panel">
          <ChatContent />
          <SendMessageForm darkMode={darkMode} auth={auth} />
        </section>
      </main>
    </>
  );
};
