const passportLocal = require('passport-local');
const bcrypt = require('bcrypt-nodejs');
const flash = require('connect-flash');
const db = require('../../database/index');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    console.log(user.rows[0].id +" was serialized");
    done(null, user.rows[0].id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    console.log(id + "is deserialized");
    db.findUserById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },

  (req, email, password, done) => {
    process.nextTick((callback) => {
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      let userInsertId;
      let groupId;
      db.findOneEmail(email)
        .then((results) => {
          if (results.rowCount > 0) {
            console.log('email taken');
            // return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            return done(null, false);
          }
          // console.log('new user!');
          const data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
            role: req.body.role,
            email: req.body.email,
            phone: req.body.phone,
          };

          return db.addUser(data);
        })
        .then((results) => {
          userInsertId = results.rows[0].id;
          passport.authenticate();
          console.log('job is', req.body.job);
          return db.findGroup(req.body.job);
        })
        .then((results) => {
          console.log('find results are', results);
          groupId = results.rows[0].id;
          return db.addUserToGroup(groupId, userInsertId);
        })
        .then(() => {
          return done(null, { userId: userInsertId, groupId });
        })
        .catch((err) => {
          throw err;
        });
    });
  }
  ));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    db.findOneEmail(email)
      .then((results) => {
        if (results.rowCount === 0) {
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        }
        // FIXME: Add bcrypt.compareSync(password, this.local.password);
        if (!results.validPassword(password)) {
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        }

        return done(null, results);
      });
  }
  ));
};

// const passportConfig = (passport, user) => {
//   const LocalStrategy = passportLocal.Strategy;
//
//   passport.use('local-signup', new LocalStrategy(
//     {
//       usernameField: 'firstName',
//       passwordField: 'password',
//       passReqToCallback: true,
//     },
//     (req, firstName, lastName, password, done) => {
//       console.log('IN PASSPORT STRATEGY');
//       const generateHash = pass => bCrypt.hashSync(pass, bCrypt.genSaltSync(8), null);
//       db.getOneUser(firstName, lastName)
//       .then((user) => {
//         console.log('DB GETONE USER IS', user);
//         if (user) {
//           return done(null, false, { message: 'username already taken' });
//         }
//         const userPassword = generateHash(password);
//         const data = {
//           firstName,
//           lastName,
//           password: userPassword,
//           role: req.body.role,
//           email: req.body.email,
//           phone: req.body.phone,
//         };
//         return db.addUser(data);
//       })
//       .then((newUser, created) => {
//         if (!newUser) {
//           return done(null, false);
//         }
//         console.log('User created', newUser, created);
//         return done(null, newUser);
//       })
//       .catch((err) => {
//         throw err;
//       });
//     }
//   ));
// };
//
// module.exports = passportConfig;
