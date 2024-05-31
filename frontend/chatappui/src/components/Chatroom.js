import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function Chatroom() {
  const [message, setMessage] = useState("");
  const [chatroom, setChatroom] = useState([]);

  async function getChatroom() {}

  useEffect(() => {
    getChatroom();
  }, [chatroom]);

  return (
    <>
      <div className="chatroomPage--container">
        {/* <ChatroomWebSocket baseUrl={baseUrl} /> */}
        <span className="active--users">
          <h2>Active Now</h2>
          <ul>
            <li>User A</li>
            <li>User B</li>
            <li>User C</li>
            <li>User D</li>
          </ul>
        </span>

        <span className="chatroom">
          <ul className="message--container">{renderMessage}</ul>
        </span>

        <form className="input--container" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="...enter message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="submit--message">Send</button>
        </form>
      </div>
    </>
  );
}

export default Chatroom;
