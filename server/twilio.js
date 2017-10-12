const Promise = require('bluebird');
const config = require('./config');

const { accountSid, authToken } = config;
const client = require('twilio')(accountSid, authToken);

// random 4 digit code, later for verification
const accessCode = Math.floor(9999 * Math.random());

const sendMessage = (user = 'aaa') => {
  return new Promise((resolve, reject) => {
    client.messages.create({
      to: '+16692613137',
      from: '+15005550006',
      body: `You are invited to Grazers Conference Event ${accessCode}`,
    }, (err, message) => {
      if (err) {
        reject(err);
      }
      console.log('message', message);
      resolve(message.sid);
    });
  });
};


module.exports = sendMessage;
