const nodemailer = require('nodemailer');
const util = require('./helpers/util');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
const sendMail = user => nodemailer.createTestAccount((err, account) => {

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hrsf81.hrsf81.grazers@gmail.com', // generated ethereal user
      pass: 'QWERTqwert11', // generated ethereal password
    },
  });

  // setup email data with unicode symbols
  const signUpLink = `http://localhost:3000/signup?group_id=${util.linkMap.group_id}&event_id=${util.linkMap.event_id}`;
  const mailOptions = {
    from: 'hrsf81.hrsf81.grazers@gmail.com', // sender address
    to: user.email, // list of receivers
    subject: 'Grazers Conference Invite', // Subject line
    // plaing text body
    text: `
      Hello,
      Please signup with the following link ${signUpLink} to Grazers conference
      access code to event meetup is ${util.accessCode()}
      `,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return info.messageId;
  });
});

module.exports = sendMail;
