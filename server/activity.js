const express = require('express');
const db = require('../database/index');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.status(200).send();
  })
  .post((req, res) => {
    const {
      event_id,
      activity,
      location,
      groups,
    } = req.body;
    // adjust data type
    const date = req.body.date.substr(0, 10);
    const starttimeDate = new Date(req.body.starttime);
    const endtimeDate = new Date(req.body.endtime);
    const starttime = starttimeDate.toTimeString().substr(0, 8);
    const endtime = endtimeDate.toTimeString().substr(0, 8);

    db.findSchedule({ date, event_id })
      .then((data) => {
        if (data.rows[0].id) {
          return data;
        }
        return db.addSchedule({ date, event_id });
      })
      .then((data) => {
        const schedule_id = data.rows[0].id;
        return db.addActivity({
          starttime,
          endtime,
          activity,
          location,
          schedule_id,
        });
      })
      .then((data) => {
        const activity_id = data.rows[0].id;
        return Promise.all(groups.map((group) => {
          db.findGroup(group)
            .then((groupData) => {
              const group_id = groupData.rows[0].id;
              return db.addGroupToActivity(group_id, activity_id);
            });
        }));
      })
      .then(results => res.status(201).send(results));
  });

module.exports = router;
