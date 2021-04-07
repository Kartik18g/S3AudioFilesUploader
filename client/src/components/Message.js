import React, { useState } from "react";
import axios from "axios";
import RecordAudio from "./RecordAudio";

const Message = ({ setMessages, messages }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (data) => {
    const res = await axios.post(
      "http://localhost:3001/message/sendMessage",
      data
    );
    setMessage("");
    setMessages([...messages, data]);
  };

  return (
    <>
      <RecordAudio handleSubmit={handleSubmit} />
    </>
  );
};

export default Message;
