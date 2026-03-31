import { useEffect, useContext, useState, useMemo } from "react";
import ChatContext from "../context/ChatProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { minidenticon } from "minidenticons";
import {
  faPaperPlane,
  faTrashCan,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const formatMessageCreatedTimestamp = (dateString) => {
    const timestamp = new Date(dateString);
    const twelveHourTime = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return twelveHourTime.format(timestamp);
  };

  const MinidenticonImg = ({ username, saturation, lightness, ...props }) => {
    const svgURI = useMemo(
      () =>
        "data:image/svg+xml;utf8," +
        encodeURIComponent(minidenticon(username, saturation, lightness)),
      [username, saturation, lightness],
    );
    // console.log("ImageURI:", svgURI);
    return <img src={svgURI} alt={username} {...props} />;
  };

  return (
    <>
      <main className="chatroom-wrapper">
        <aside className="sidebar">
          <ul className="user-list">
            {userList.map((user) => (
              <li className="username-active" key={user.userId}>
                <div className="active-container">
                  <FontAwesomeIcon icon={faCircle} className="fa-circle" />
                </div>
                <span className="active-username-container">
                  <h3>{user.username}</h3>
                </span>
              </li>
            ))}
          </ul>
        </aside>
        <section className="chat-panel">
          <div className="chat-content">
            <ul className="message-list">
              {messageList
                .filter((message) => !message.isDeleted)
                .map((message) => (
                  <div
                    className={`message ${auth.userId === message.userId ? "current" : ""}`}
                    key={message.id}
                  >
                    <div className="identicon-container">
                      <MinidenticonImg
                        username={message.username}
                        saturation="90"
                        width="45"
                        height="45"
                        className="identicon"
                      />
                    </div>
                    <div className="message-detail-wrapper">
                      <h4
                        className={`username ${auth.userId === message.userId ? "right" : ""}`}
                      >
                        {message.username}
                      </h4>

                      <div className="text-content">{message.text}</div>
                      <time
                        className={`timestamp ${auth.userId === message.userId ? "left" : ""}`}
                      >
                        {formatMessageCreatedTimestamp(message.createdDate)}
                      </time>
                    </div>
                    <div className="delete-container">
                      {message.userId === auth.userId && (
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteMessage(message)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </ul>
          </div>
          <footer className="chat-footer">
            <form onSubmit={handleCreateMessage}>
              <label htmlFor="message-input">Send Message</label>
              <textarea
                id="message-input"
                name="message-input"
                maxLength="500"
                value={message}
                onChange={handleChange}
                placeholder="Type your message here..."
                required
              />
              <button type="submit" className="send-message-button">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </footer>
        </section>
      </main>
    </>
  );
};
