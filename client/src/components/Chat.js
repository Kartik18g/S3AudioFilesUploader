import React, { useEffect, useState } from "react";
import Message from "./Message";
import axios from "axios";
import "./styles/Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([{}]);

  return (
    <div className="app">
      <div className="title">Upload to S3</div>
      {/* <Thread messages={messages} /> */}
      <div className="text-box">
        <Message setMessages={setMessages} messages={messages} />
        &nbsp; Click to Upload audio
        <img
          type="button"
          data-toggle="modal"
          data-target="#audio-upload-modal"
          className="stt-icon"
          src="https://static.thenounproject.com/png/1425923-200.png"
          alt=""
        />
        &nbsp;
      </div>
    </div>
  );
};

export default Chat;
