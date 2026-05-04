import React from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState } from "react";

const SendMessageForm = ({ darkMode, auth }) => {
  const [message, setMessage] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleCreateMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const controller = new AbortController();

    try {
      await axiosPrivate.post(
        "messages",
        {
          UserId: auth.userId,
          Text: message,
        },
        {
          signal: controller.signal,
        },
      );
      setMessage("");
    } catch (error) {
      console.error("Error creating message:", error);
    }
    return () => {
      controller.abort();
    };
  };

  const maxLength = 300;
  const currentLength = message.length;
  const progressWidth = (currentLength / maxLength) * 100;

  let barColor =
    darkMode === "light" ? "rgb(34, 34, 34)" : "rgb(255, 255, 255)";
  let textColor =
    darkMode === "light" ? "rgb(34, 34, 34)" : "rgb(255, 255, 255)";

  if (progressWidth > 60 && progressWidth < 85) {
    barColor = "rgb(236, 157, 8)";
    textColor = "rgb(236, 157, 8)";
  } else if (progressWidth >= 85) {
    barColor = "rgb(241, 9, 9)";
    textColor = "rgb(241, 9, 9)";
  }

  return (
    <>
      <form className="message-form" onSubmit={handleCreateMessage}>
        <div className="message-form-container">
          <textarea
            id="message-text"
            name="message-text"
            maxLength={maxLength}
            value={message}
            onChange={handleChange}
            placeholder="Type your message here..."
            required
          />
          <button type="submit" className="send-message-button">
            Send
          </button>
        </div>
        <div className="progress-container">
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${progressWidth}%`,
                backgroundColor: barColor,
              }}
            ></div>
            <p className="remaining-chars" style={{ color: textColor }}>
              {maxLength - currentLength} characters left
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default SendMessageForm;
