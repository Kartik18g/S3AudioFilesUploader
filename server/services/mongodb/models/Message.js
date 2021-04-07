var mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema({
  type: { type: String, default: null },
  text: { type: String, default: null },
  audioUrl: { type: String, default: null },
  provider: { type: String, default: null },
  transcriptionId: { type: String, default: null },
  transcription: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);
