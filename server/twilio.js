const Promise = require('bluebird');
const config = require('./config');

const { accountSid, authToken } = config;

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

const accessCode = 7239;

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
