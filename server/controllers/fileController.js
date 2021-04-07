var aws = require("aws-sdk");
var axios = require("axios");
const { queue } = require("jquery");

require("dotenv").config();

aws.config.update({
  region: process.env.AWS_REGION, // Put your aws region here
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_KEY_SECRET,
  signatureVersion: "v4",
});

const S3_BUCKET = process.env.AWS_BUCKET_NAME;

exports.uploadToS3 = async (req) => {
  try {
    const s3 = new aws.S3();
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;
    var returnData;

    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      ContentType: fileType,
      ACL: "public-read",
    };

    var d = await s3.getSignedUrl("putObject", s3Params);
    returnData = {
      signedRequest: d,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };
    return returnData;
  } catch (err) {
    return {
      data: null,
      message: "Server Error",
      statusCode: 400,
      status: 0,
    };
  }
};
