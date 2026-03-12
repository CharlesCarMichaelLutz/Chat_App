import { useEffect, useContext } from "react";
import ChatContext from "../context/ChatProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const Chatroom = () => {
  const { auth, userList, setUserList, messageList, setMessageList } =
    useContext(ChatContext);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!auth?.accessToken) return;

    const controller = new AbortController();

    const getUserList = async () => {
      try {
        const response = await axiosPrivate.get("users", {
          signal: controller.signal,
        });
        console.log("user list:", response.data);
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
    if (!auth?.accessToken) return;

    const controller = new AbortController();

    const getMessageList = async () => {
      try {
        const response = await axiosPrivate.get("messages", {
          signal: controller.signal,
        });
        console.log("message list:", response.data);
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
        <aside className="sidebar">
          {/* <ul>
            {userList.map((user) => (
              <li key={user.userId}>{user.username}</li>
            ))}
          </ul> */}
          <ul className="user-list">
            {userList.map((user) => (
              <li key={user.userId}>{user.username}</li>
            ))}
          </ul>
          {/* <ul className="user-list">
            <li>Bill</li>
            <li>Mary</li>
            <li>James</li>
            <li>Sue</li>
            <li>Larry</li>
            <li>Sarah</li>
            <li>Tom</li>
            <li>Jessica</li>
            <li>Peter</li>
            <li>Amy</li>
            <li>Derek</li>
            <li>Emily</li>
          </ul> */}
        </aside>
        <section className="chat-panel">
          <div className="chat-content">
            {/* <ul>
              {messageList.map((message) => (
                <li key={message.id}>
                  <span>{message.userId}</span>
                  <span>{message.text}</span>
                </li>
              ))}
            </ul> */}
            <ul className="message-list">
              {messageList.map((message) => (
                <li className="message" key={message.id}>
                  <span className="username">{message.userId}</span>
                  <span className="content">{message.text}</span>
                </li>
              ))}
            </ul>
            {/* <ul className="message-list">
              <li className="message">
                <span className="username">Billionare</span>
                <span className="content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ipsum, quibusdam!
                </span>
              </li>
            </ul> */}
          </div>
          <footer className="chat-footer"></footer>
        </section>
      </main>
    </>
  );
};
