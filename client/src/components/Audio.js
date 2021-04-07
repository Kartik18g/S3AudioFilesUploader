import { useState } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import axios from "axios";

const audioRecorder = new MicRecorder({ bitRate: 128 });

const Audio = ({ createTranscriptionRequest }) => {
  const [state, setState] = useState({});
  const [provider, setProvider] = useState("Assembly");

  const start = async () => {
    if (state.isblocked) {
      console.log("permission Denied");
    } else {
      try {
        await audioRecorder.start();
        setState({ ...state, isrecording: true });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const stop = async () => {
    try {
      const data = await audioRecorder.stop().getMp3();
      const [buffer, blob] = data;
      const blobUrl = URL.createObjectURL(blob);
      setState({ ...state, blobUrl, isrecording: false, isUploading: true });
      var d = new Date();
      var file = new File([blob], d.valueOf(), { type: "audio/wav" });
      handleaudiofile(file);
    } catch (err) {
      console.log(err, "something wrong happened");
    }
  };

  const handleaudiofile = async (ev) => {
    let file = ev;
    let fileName = ev.name;
    let fileType = ev.type;
    try {
      const response = await axios.post(
        "http://localhost:3001/file/uploadToS3",
        {
          fileName: fileName,
          fileType: fileType,
        }
      );

      var returnData = response.data;
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      var options = {
        headers: {
          "Content-Type": fileType,
          "x-amz-acl": "public-read",
        },
      };

      const result = await axios.put(signedRequest, file, options);
      setState({ isUploading: false, isUploaded: true, recordingUrl: url });
    } catch (error) {}
  };
  return (
    <div className="container">
      <div style={{ textAlign: "center" }}>
        <audio src={state.blobUrl} controls="controls" />
      </div>
      {!state.isUploading ? (
        <div className="audio-action-buttons">
          <button
            className="btn btn-success"
            onClick={start}
            disabled={state.isrecording}
            type="button"
          >
            Start
          </button>
          <button className="btn-danger btn" onClick={stop} type="button">
            Stop
          </button>
        </div>
      ) : (
        <>Uplading your file now</>
      )}
      {state.isUploaded ? (
        <a target="__blank" href={state.recordingUrl}>
          Uploaded
        </a>
      ) : null}
    </div>
  );
};

export default Audio;
