const passportLocal = require('passport-local');
const bcrypt = require('bcrypt-nodejs');
const flash = require('connect-flash');
const db = require('../../database/index');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.rows[0].id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    db.findUserById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },

    (req, email, password, done) => {
      process.nextTick(() => {
        let userInsertId;
        let groupId;
        const handleNormalUser = () => (
          db.findGroup(req.body.job, req.body.event_id)
            .then((results) => {
              groupId = results.rows[0].id;
              return db.addUserToGroup(groupId, userInsertId);
            })
        );

        // See if email exists
        db.findOneEmail(email)
          .then((results) => {
            if (results.rowCount > 0) {
              return done(null, false);
            }
            const data = {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
              role: req.body.role,
              email: req.body.email,
              phone: req.body.phone,
              event_id: req.body.event_id,
            };

            return db.addUser(data);
          })
          .then((results) => {
            userInsertId = results.rows[0].id;
            passport.authenticate();
            if (req.body.role === 'organizer') {
              groupId = null;
              return groupId;
            }
            return handleNormalUser();
          })
          .then(() => (
            done(null, { userId: userInsertId, groupId })
          ))
          .catch((err) => {
            throw err;
          });
      });
    }
  ));

  passport.use('local-login', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      // See if email exists
      db.findOneEmail(email)
        .then((results) => {
          if (results.rowCount === 0) {
            return done(null, false, { exists: false });
          }
          // Authenticate password
          const retrievedPassword = results.rows[0].password;
          const validPassword = bcrypt.compareSync(password, retrievedPassword);
          if (!validPassword) {
            return done(null, false, { exists: true });
          }
          return done(null, results);
        });
    }
  ));
};
