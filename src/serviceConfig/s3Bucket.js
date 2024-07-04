const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();

const { 
  AWS_S3_CREDENTIALS_ACCESS_KEY: accessKeyId, 
  AWS_S3_CREDENTIALS_SECRET_KEY: secretAccessKey, 
  S3_REGION: region 
} = process.env;

const s3Client = new S3Client({
  credentials: { accessKeyId, secretAccessKey },
  region
});

module.exports = { s3Client };
