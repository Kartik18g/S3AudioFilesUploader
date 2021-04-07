var express = require("express");
let fileController = require("../controllers/fileController");

var router = express.Router();

router.post("/uploadToS3", async (req, res) => {
  try {
    let data = await fileController.uploadToS3(req);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: "FAILED",
      data: null,
      error: error,
    });
  }
});

module.exports = router;
