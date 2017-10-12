const express = require('express');
const db = require('../database/index');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/:eventId', (req, res) => {
  const { eventId } = req.params;
  db.getSchedulesByEvent(eventId)
    .then((schedulesData) => {
      return Promise.all(schedulesData.rows.map((schedule) => {
        const { date } = schedule;
        return db.getActivitiesByDay(schedule.id)
          .then(activitiesData => {
            return Promise.all(activitiesData.rows.map((actData) => {
              const activity = actData;
              return db.getGroupNamesByActivity(activity.id)
                .then(groups => {
                  activity.groups = groups.rows;
                  return activity;
                });
            }));
          })
          .then((timetable) => {
            return { date, timetable };
          });
      }));
    })
    .then((results) => {
      res.status(200).send(results);
    });
});

router.get('/:eventId/:groupId', (req, res) => {
  const { eventId, groupId } = req.params;
  db.getSchedulesByEvent(eventId)
    .then((schedulesData) => {
      return Promise.all(schedulesData.rows.map((schedule) => {
        const { id, date } = schedule;
        return db.getActivitiesByDayByGroup(id, groupId)
          .then(activitiesData => activitiesData.rows)
          .then((timetable) => {
            return { date, timetable };
          });
      }));
    })
    .then((results) => {
      res.status(200).send(results);
    });
});

module.exports = router;
