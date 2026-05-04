import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { axiosPrivate } from "../api/base";
import ChatContext from "../context/ChatProvider";
import { minidenticon } from "minidenticons";
import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Message = ({ message, auth }) => {
  const formatMessageCreatedTimestamp = (dateString) => {
    const timestamp = new Date(dateString);
    const twelveHourTime = new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return twelveHourTime.format(timestamp);
  };

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
    } catch (error) {
      console.error("Error deleting message:", error);
    }

    return () => {
      controller.abort();
    };
  };

  const MinidenticonImg = ({ username, saturation, lightness, ...props }) => {
    const svgURI = useMemo(
      () =>
        "data:image/svg+xml;utf8," +
        encodeURIComponent(minidenticon(username, saturation, lightness)),
      [username, saturation, lightness],
    );
    return <img src={svgURI} alt={username} {...props} />;
  };

  return (
    <>
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
            <strong>{message.username}</strong>
          </h4>

          <div className="text-content">{message.text}</div>
          <time
            className={`timestamp ${auth.userId === message.userId ? "left" : ""}`}
          >
            <em>{formatMessageCreatedTimestamp(message.createdDate)}</em>
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
    </>
  );
};

export default Message;
