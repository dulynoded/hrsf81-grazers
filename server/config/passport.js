const passportLocal = require('passport-local');
const bCrypt = require('bcrypt-nodejs');
const db = require('../../database/index');

const passportConfig = (passport, user) => {
  const User = user;
  const LocalStrategy = passportLocal.Strategy;

  passport.use('local-signup', new LocalStrategy(
    {
      firstnameField: 'firstName',
      lastnameField: 'lastName',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, firstName, lastName, password, done) => {
      const generateHash = pass => bCrypt.hashSync(pass, bCrypt.genSaltSync(8), null);
      db.getOneUser(firstName, lastName)
        .then((user) => {
          if (user) {
            return done(null, false, { message: 'username already taken' });
          }
          const userPassword = generateHash(password);
          const data = {
            firstName,
            lastName,
            role: req.body.role,
            email: req.body.email,
            phone: req.body.phone,
          };
          return db.addUser(data);
        })
        .then((newUser, created) => {
          if (!newUser) {
            return done(null, false);
          }
          console.log('User created', newUser, created);
          return done(null, newUser);
        })
        .catch((err) => {
          throw err;
        });
    }
  ));
};

module.exports = passportConfig;
