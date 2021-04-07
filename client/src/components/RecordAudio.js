import React from "react";
import TextToSpeech from "./TextToSpeech";

const RecordAudio = ({ handleSubmit }) => {
  return (
    <div
      className="modal fade"
      id="audio-upload-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Record Audio
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <TextToSpeech handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordAudio;
