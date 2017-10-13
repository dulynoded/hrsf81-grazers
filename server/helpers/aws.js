const AWS = require('aws-sdk');
try {
  const secrets = require('../config/aws');
  AWS.config.update({
    accessKeyId: secrets.AWS_ACCESS_KEY_ID,
    secretAccessKey: secrets.AWS_SECRET_ACCESS_KEY,
    "region": "us-west-1"
  });
}
catch(err) {
  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    "region": "us-west-1"
  });
}

const s3bucket = new AWS.S3({params: {Bucket: 'hrsf81-grazers'}, apiVersion: '2006-03-01' });
s3bucket.listObjects().promise()
  .then((data) => {
    const keys = data.Contents.map(entry => entry.Key);
    // console.log(keys);
  });

  const promiz = () => {
    return s3bucket.listObjects().promise();
  };

const getSticker = (key) => {
  s3bucket.getObject({ Key: key }).promise()
    .then((data) => {
      // console.log(data.Body);
    })
    .catch(err => console.error(err));
};

module.exports.getSticker = getSticker;
module.exports.promiz = promiz;
