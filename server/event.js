const express = require('express');
const stub = require('./stubData.js');
const db = require('../database/index');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.route('/')
  .get((req, res) => {
    res.status(200).send();
  })
  .post((req, res) => {
    console.log('posting event', req.body);
    const eventObj = {
      name: req.body.name,
      location: req.body.location,
      organizer_id: req.body.organizer_id,
      startdate: req.body.start_date,
      enddate: req.body.end_date,
    };
    let event_id;
    db.addEvent(eventObj)
      .then((data) => {
        console.log('data is', data);
        event_id = data.rows[0].id;
        const promiseArr = [];
        promiseArr.push(db.addGroup({ type: 'attendee', name: 'General Admissions', event_id }));
        req.body.groups.forEach((group) => {
          const groupObj = {
            name: group,
            type: 'staff',
            event_id
          };
          promiseArr.push(db.addGroup(groupObj));
        });
        return Promise.all(promiseArr);
      })
      .then(() => {
        return db.addEventToUser(eventObj.organizer_id, event_id);
      })
      .then(() => {
        res.status(200).send({ event_id, name: eventObj.name });
      })
      .catch((err) => {
        console.log('err in add event', err);
      });
  })

router.route('/:eventId')
  .get((req, res) => {
    const eventId = Number(req.params.eventId);
    db.getEvent(eventId)
      .then(eventData => res.status(200).send(eventData.rows[0]));
  })
  .put((req, res) => {
    const updatedEventObj = req.body;
    updatedEventObj.id = Number(req.params.eventId);
    res.status(200).send(updatedEventObj);
  });

router.route('/:eventId/groups')
  .get((req, res) => {
    const eventId = Number(req.params.eventId);
    db.getGroupsByEvent(eventId)
      .then(groupsData => res.status(200).send(groupsData.rows));
  })
  .post((req, res) => {
    const newGroupObj = req.body;
    newGroupObj.eventId = Number(req.params.eventId);
    res.status(201).send(newGroupObj);
  });

router.get('/:eventId/messages', (req, res) => {
  res.status(200).send(stub.messages);
});

router.get('/:eventId/users', (req, res) => {
  res.status(200).send(stub.users);
});

router.get('/:eventId/schedule', (req, res) => {
  const eventId = Number(req.params.eventId);
  let event;
  for (let i = 0; i < stub.events.length; i += 1) {
    if (stub.events[i].id === eventId) {
      event = stub.events[i];
      break;
    }
  }
  let schedule;
  for (let i = 0; i < stub.schedules.length; i += 1) {
    if (stub.schedules[i].id === event.scheduleId) {
      schedule = stub.schedules[i];
      break;
    }
  }
  res.status(200).send(schedule);
});

module.exports = router;
