const express = require('express');
const passport = require('passport');
const bCrypt = require('bcrypt-nodejs');
const stub = require('./stubData.js');
// const flash = require('connect-flash');
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
      res.status(300).send(user);
    } else {
      res.status(200).send(user);
    }
  })(req, res, next);
});

router.get('/login', (req, res, next) => {
  console.log('req.body is', req.body);
  passport.authenticate('local-login', (err, user, info) => {
    console.log('err', err);
    console.log('user', user);
    console.log('info', info);
    if (err) {
      return next(err);
    }
    if (user === false) {
      res.status(300).send(user);
    } else {
      res.status(200).send(user.rows[0]);
    }
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
  let userGroup;
  db.findGroupByUserId(userId)
    .then((results) => {
      console.log('group_user results are', results);
      const groupId = results.rows[0].group_id;
      return db.findGroupById(groupId);
    })
    .then((results) => {
      console.log('group results are', results.rows[0]);
      return results.rows[0];
    })
    .then((groupData) => {
      res.status(200).send(groupData);
    })
    .catch((err) => {
      throw err;
    });
  // for (let i = 0; i < stub.userGroups.length; i += 1) {
  //   if (stub.userGroups[i].userId === userId) {
  //     userGroup = stub.userGroups[i];
  //     break;
  //   }
  // }
  // let group;
  // for (let i = 0; i < stub.groups.length; i += 1) {
  //   if (stub.groups[i].id === userGroup.groupId) {
  //     group = stub.groups[i];
  //     break;
  //   }
  // }
  // res.status(200).send(group);
});

module.exports = router;
