const express = require('express');
const passport = require('passport');
const stub = require('./stubData.js');
const db = require('../database/index');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.post('/', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    console.log('err', err);
    console.log('user', user);
    console.log('info', info);
    if (err) {
      return next(err);
    }
    if (user === false) {
      return res.status(300).send(user);
    }
    return res.status(200).send(user);
  })(req, res, next);
});

router.get('/login', (req, res, next) => {
  console.log('in login');
  passport.authenticate('local-login', (err, user, info) => {
    console.log('err', err);
    console.log('user', user);
    console.log('info', info);
    if (err) {
      return next(err);
    }
    if (user === false) {
      return res.status(300).send({ user, info });
    }
    return res.status(200).send(user.rows[0]);
  })(req, res, next);
});

router.route('/:userId')
  .get((req, res) => {
    const userId = Number(req.params.userId);
    let user;
    for (let i = 0; i < stub.users.length; i += 1) {
      if (stub.users[i].id === userId) {
        user = stub.users[i];
      }
    }
    res.status(200).send(user);
  })
  .put((req, res) => {
    const updatedUserObj = req.body;
    updatedUserObj.id = Number(req.params.userId);
    res.status(201).send(updatedUserObj);
  });

router.get('/:userId/group', (req, res) => {
  const userId = Number(req.params.userId);
  db.findGroupByUserId(userId)
    .then((results) => {
      const groupId = results.rows[0].group_id;
      return db.findGroupById(groupId);
    })
    .then((results) => {
      return results.rows[0];
    })
    .then((groupData) => {
      res.status(200).send(groupData);
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = router;
