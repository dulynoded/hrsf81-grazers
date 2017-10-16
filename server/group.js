const express = require('express');
const stub = require('./stubData.js');
const db = require('../database/index');

const router = express.Router();

router.route('/:groupId')
  .get((req, res) => {
    const groupId = Number(req.params.groupId);
    let group;

    for (let i = 0; i < stub.groups.length; i += 1) {
      if (stub.groups[i].id === groupId) {
        group = stub.groups[i];
      }
    }
    res.status(200).send(group);
  })
  .put((req, res) => {
    const updatedEventObj = req.body;
    updatedEventObj.id = Number(req.params.eventId);
    res.status(200).send(updatedEventObj);
  });

router.route('/:groupId/users')
  .get((req, res) => {
    const groupId = Number(req.params.groupId);
    db.getUsersByGroup(groupId)
      .then(usersData => res.status(200).send(usersData.rows));
  })
  .post((req, res) => {
    const groupId = Number(req.params.groupId);
    const users = req.body;
    let dummyUserId = 6;
    const userGroups = users.map(() => {
      dummyUserId += 1;
      return {
        groupId,
        userId: dummyUserId
      };
    });
    res.status(201).send(userGroups);
  });

router.delete('/:groupId/user/:userId', (req, res) => {
  const groupId = Number(req.params.groupId);
  const userId = Number(req.params.userId);
  const groupUsers = stub.userGroups.filter(userGroup =>
    userGroup.groupId === groupId && userGroup.userId !== userId);
  const users = groupUsers.map((groupUser) => {
    let matchedUser;
    for (let i = 0; i < stub.users.length; i += 1) {
      if (stub.users[i].id === groupUser.userId) {
        matchedUser = stub.users[i];
        break;
      }
    }
    return matchedUser;
  });
  res.status(200).send(users);
});

module.exports = router;
