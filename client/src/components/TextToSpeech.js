import React, { useState, useEffect } from "react";
import useDidMountEffect from "../hooks/useDidMountEffect";
import axios from "axios";
import Audio from "./Audio";

const TextToSpeech = ({ handleSubmit }) => {
  const createTranscriptionRequest = async (recordingUrl) => {
    const res = await axios.post("http://localhost:3001/file/queue", {
      recordingUrl: recordingUrl,
      provider: recordingUrl.provider,
    });
    console.log(res.data);
    handleSubmit({
      text: "",
      type: "audio",
      audioUrl: recordingUrl,
      transcriptionId: res.data.id,
      provider: recordingUrl.provider,
    });
  };

  // useDidMountEffect(() => {
  //   console.log("creating request");
  //   // createTranscriptionRequest();
  // }, recordingUrl);

  return (
    <div className="container">
      <div>
        <Audio createTranscriptionRequest={createTranscriptionRequest} />
      </div>
    </div>
  );
};

export default TextToSpeech;
