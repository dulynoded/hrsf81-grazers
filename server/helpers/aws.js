const AWS = require('aws-sdk');
let accessKey;
let secretAccessKey;


try {
  const secrets = require('../config/aws');
  accessKey = secrets.AWS_ACCESS_KEY_ID;
  secretAccessKey = secrets.AWS_SECRET_ACCESS_KEY;
} catch(err) {
  accessKey = process.env.ACCESS_KEY_ID;
  secretAccessKey = process.env.SECRET_ACCESS_KEY;
}

// console.log('AWS KEY IS', accessKey);
// console.log('AWS SECRET KEY IS', secretAccessKey);


AWS.config.update({
  accessKeyId: accessKey,
  secretAccessKey: secretAccessKey,
  region: 'us-west-1'
});


const s3bucket = new AWS.S3({ params: { Bucket: 'hrsf81-grazers' }, apiVersion: '2006-03-01' });
s3bucket.listObjects().promise()
  .then((data) => {
    const keys = data.Contents.map(entry => entry.Key);
  });

const promiz = (category) => {
  return s3bucket.listObjects({
    Prefix: `${category}/`
  }).promise();
};

const getSticker = (key) => {
  s3bucket.getObject({ Key: key }).promise()
    .then((data) => {
    })
    .catch(err => console.error(err));
};

module.exports.getSticker = getSticker;
module.exports.promiz = promiz;
