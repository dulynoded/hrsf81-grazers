const path = require('path');
const express = require('express');

const app = express();
const passport = require('passport');
const session = require('express-session');
const server = require('http').Server(app);
const WebSocket = require('ws');
const db = require('../database/index');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const flash = require('connect-flash');

const port = process.env.PORT || '3000';
const wss = new WebSocket.Server({ server });

const event = require('./event');
const group = require('./group');
const user = require('./user');
const messages = require('./messages');
const schedule = require('./schedule');
const activity = require('./activity');
const attendee = require('./attendee');

require('./config/passport.js')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// For Passport
app.use(session({
  secret: 'fluffy bunnies',
  resave: true,
  saveUninitialized: true,
})); // session secret
app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions
app.use(flash());

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(express.static(path.join(__dirname, '/../node_modules')));
app.use(express.static(path.join(__dirname, '/../client/src/templates')));
app.use('/event', event);
app.use('/group', group);
app.use('/user', user);
app.use('/messages', messages);
app.use('/schedule', schedule);
app.use('/activity', activity);
app.use('/attendee', attendee);

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    msg = JSON.parse(msg);

    if (msg.fromName) {
      // rest operator for destructuring objects is not yet supported in Node
      const msgRecord = Object.assign({ timestamp: new Date() }, msg);
      db.addMessage(msgRecord)
        .then(() => {
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(msg));
            }
          });
        })
        .catch((err) => { console.error(`ERROR: message was not saved to the DB (${err})`); });
    }

    if (msg.activity) {
      const { event_id, activity, location, groups } = msg;
      // adjust data type
      const date = msg.date.substr(0, 10);
      const starttimeDate = new Date(msg.starttime);
      const endtimeDate = new Date(msg.endtime);
      const starttime = starttimeDate.toTimeString().substr(0, 8);
      const endtime = endtimeDate.toTimeString().substr(0, 8);

      db.findSchedule({ date, event_id })
        .then((data) => {
          if (data.rows[0] && data.rows[0].id) {
            return data;
          }
          return db.addSchedule({ date, event_id });
        })
        .then((data) => {
          const schedule_id = data.rows[0].id;
          return db.addActivity({ starttime, endtime, activity, location, schedule_id });
        })
        .then((data) => {
          const activity_id = data.rows[0].id;
          return Promise.all(groups.map((group) => {
            db.findGroup(group, event_id)
              .then((groupData) => {
                const group_id = groupData.rows[0].id;
                return db.addGroupToActivity(group_id, activity_id);
              });
          }));
        })
        .then((results) => {
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(results));
            }
          });
        })
        .catch((err) => { console.error(`ERROR: activity was not saved to the DB (${err})`); });
    }
  });
});

app.route('/events')
  .get((req, res) => {
    if (req.query.id) {
      db.getEvent(req.query.id)
        .then((data) => {
          res.status(200).send(data.rows);
        })
        .catch((err) => {
          console.log('err in events get', err);
        });
    } else {
      db.getAllEvents()
        .then((data) => {
          res.status(200).send(data.rows);
        })
        .catch((err) => {
          console.log('err in events get', err);
        });
    }
  })
  .post((req, res) => {
    const newEventObj = req.body;
    res.status(201).send(newEventObj);
  });

app.get('/groups', (req, res) => {
  db.getAllGroups()
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((err) => {
      console.log('err in groups get', err);
    });
});

app.get('/users', (req, res) => {
  db.getAllUsers()
    .then((results) => {
      res.status(200).send(results.rows);
    })
    .catch((err) => {
      throw err;
    });
});

// send back to client for route handling
app.use('/*', (req, res) => {
  res.sendFile(path.resolve('client/dist/index.html'));
});

if (module.parent) {
  module.exports = app;
} else {
  server.listen(port, () => {
    console.log(`Event HUD server running on port ${port}`);
  });
}
