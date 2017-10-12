const AWS = require('aws-sdk');
const secrets = require('../config/aws');
AWS.config.update({
  accessKeyId: secrets.AWS_ACCESS_KEY_ID,
  secretAccessKey: secrets.AWS_SECRET_ACCESS_KEY,
  "region": "us-west-1"
});

const s3bucket = new AWS.S3({params: {Bucket: 'hrsf81-grazers'}, apiVersion: '2006-03-01' });
let keyname = '141733.png';
let promise = s3bucket.getObject({ Key: keyname }).promise();

const getSticker = () => {
  return promise.then((data) => {
    console.log(data);
    return data;
  })
  .catch(err => console.error(err));
};

module.exports.getSticker = getSticker;
