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

// router.post('/', (req, res) => {
//   console.log('IN POST! req.body is', req.body);
//   const userObj = req.body;
//   const generateHash = pass => bCrypt.hashSync(pass, bCrypt.genSaltSync(8), null);
//   db.getOneUser(userObj.firstname, userObj.lastname)
//     .then((user) => {
//       console.log('DB GETONE USER IS', user);
//       if (user) {
//         res.status(201).send({ error: 'username taken'});
//         return;
//         // return done(null, false, { message: 'username already taken' });
//       }
//       const userPassword = generateHash(password);
//       const data = {
//         firstName,
//         lastName,
//         password: userPassword,
//         role: req.body.role,
//         email: req.body.email,
//         phone: req.body.phone,
//       };
//       return db.addUser(data);
//     })
//     .then((newUser, created) => {
//       if (!newUser) {
//         return done(null, false);
//       }
//       console.log('User created', newUser, created);
//       return done(null, newUser);
//     })
//     .catch((err) => {
//       throw err;
//     });
//   res.status(201).send();
// });

router.post('/', (req, res, next) => {
  console.log('in post')
  console.log('req body is', req.body);
  passport.authenticate('local-signup', (err, user, info) => {
    console.log('err', err);
    console.log('user', user);
    console.log('info', info);
    if (err) {
      return next(err);
    }
    if (user === false) {
      res.status(401).send(info);
    } else {
      res.status(200).send(info);
    }
  })(req, res, next);
});
// ,
// // passport.authenticate('local-signup', {
// //   successRedirect: '/organizer',
// //   failureRedirect: '/',
// //   failureFlash: true,
// // })
// );

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
  for (let i = 0; i < stub.userGroups.length; i += 1) {
    if (stub.userGroups[i].userId === userId) {
      userGroup = stub.userGroups[i];
      break;
    }
  }
  let group;
  for (let i = 0; i < stub.groups.length; i += 1) {
    if (stub.groups[i].id === userGroup.groupId) {
      group = stub.groups[i];
      break;
    }
  }
  res.status(200).send(group);
});

module.exports = router;
