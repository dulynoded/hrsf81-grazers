const express = require('express');
const db = require('../database/index');
const sendMessage = require('./twilio');
const sendMail = require('./mail');


const router = express.Router();

router.use((req, res, next) => {
  console.log(`Handing ${req.originalUrl} routes`);
  next();
});

router.get('/', (req, res) => {
  db.getAllAttendees()
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      throw err;
    });
});

router.get('/:userId', (req, res) => {
  const userId = Number(req.params.userId);

  db.getAttendeesById(userId)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      throw err;
    });
});

router.post('/', (req, res) => {
  const attendeeParams = req.body;
  const groupId = 4; // hard coded for attendee for now

  if (!('event_id' in attendeeParams)) {
    attendeeParams.event_id = 1;
  }

  db.addUser(attendeeParams)
    .then((userData) => {
      // send response
      res.status(201).send();

      // update group_user data
      const userId = userData.rows[0].id;

      db.addUserToGroup(groupId, userId)
        .then((userGroupData) => {
          // console.log(userGroupData);
        })
        .catch((err) => {
          throw err;
        });

      // sendMessage to mobile/phone
      sendMessage(attendeeParams)
        .then((msgData) => {
          // console.log(msgData.sid);
        })
        .catch((err) => {
          throw err;
        });

      // sendMail to email
      sendMail(attendeeParams)
        .then((mailData) => {
          // console.log(mailData.id)
        })
        .catch((err) => {
          throw err;
        })
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = router;
