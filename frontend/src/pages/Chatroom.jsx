import { useEffect, useContext, useState } from "react";
import ChatContext from "../context/ChatProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const Chatroom = () => {
  const { auth, userList, setUserList, messageList, setMessageList } =
    useContext(ChatContext);
  const axiosPrivate = useAxiosPrivate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  //load users
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

  //load messages
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

  //post create message
  const handleCreateMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const controller = new AbortController();

    try {
      const response = await axiosPrivate.post(
        "messages",
        {
          UserId: auth.userId,
          Text: message,
        },
        {
          signal: controller.signal,
        },
      );
      console.log("created message:", response.data);
      setMessage("");
    } catch (error) {
      console.error("Error creating message:", error);
    }
    return () => {
      controller.abort();
    };
  };

  //patch delete message
  const handleDeleteMessage = async (message) => {
    const controller = new AbortController();
    try {
      await axiosPrivate.patch(
        "messages",
        {
          Id: message.id,
          UserId: message.userId,
          IsDeleted: true,
        },
        {
          signal: controller.signal,
        },
      );
      console.log("delete request success");
    } catch (error) {
      console.error("Error deleting message:", error);
    }

    return () => {
      controller.abort();
    };
  };

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
            {/* <ul className="message-list">
              {messageList.map((message) => (
                <li className="message" key={message.id}>
                  <span className="username">{message.username}</span>
                  <span className="content">{message.text}</span>
                  {message.userId === auth.userId && (
                    <button
                      className="delete"
                      onClick={() => handleDeleteMessage(message)}
                    >
                      delete
                    </button>
                  )}
                </li>
              ))}
            </ul> */}
            <ul className="message-list">
              {messageList
                .filter((message) => !message.isDeleted)
                .map((message) => (
                  <li className="message" key={message.id}>
                    <span className="username">{message.username}</span>
                    <span className="content">{message.text}</span>
                    {message.userId === auth.userId && (
                      <button
                        className="delete"
                        onClick={() => handleDeleteMessage(message)}
                      >
                        delete
                      </button>
                    )}
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
          <footer className="chat-footer">
            <form onSubmit={handleCreateMessage}>
              <label htmlFor="message-input">Send Message</label>
              <textarea
                id="message-input"
                name="message-input"
                value={message}
                onChange={handleChange}
                placeholder="Type your message here..."
                required
              />
              <button type="submit">Send</button>
            </form>
          </footer>
        </section>
      </main>
    </>
  );
};
