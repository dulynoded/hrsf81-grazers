const path = require('path');
const express = require('express');
const db = require('../database/index');

const app = express();
const server = require('http').Server(app);
const WebSocket = require('ws');

const port = process.env.PORT || '3000';
const wss = new WebSocket.Server({ server });

const bodyParser = require('body-parser');
const event = require('./event');
const group = require('./group');
const user = require('./user');
const messages = require('./messages');
const schedule = require('./schedule');
const stub = require('./stubData');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(express.static(path.join(__dirname, '/../node_modules')));
app.use(express.static(path.join(__dirname, '/../client/src/templates')));
app.use('/event', event);
app.use('/group', group);
app.use('/user', user);
app.use('/messages', messages);
app.use('/schedule', schedule);

// const wsKeepAlive = () => {
//   wss.clients.forEach((client) => {
//     client.send('KeepAlive');
//   });
// };

wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.on('message', (msg) => {
    console.log(`Received ${msg}`);
    if (msg !== 'KeepAlive') {
      // rest operator for destructuring objects is not yet supported in Node
      const msgRecord = Object.assign({ timestamp: new Date() }, JSON.parse(msg));
      db.addMessage(msgRecord)
        .catch((err) => { console.error(`ERROR: message was not saved to the DB (${err})`); });
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(msg);
        }
      });
    }
  });

  //setInterval(wsKeepAlive, 5000);
});

app.route('/events')
  .get((req, res) => {
    res.status(200).send(stub.events);
  })
  .post((req, res) => {
    const newEventObj = req.body;
    res.status(201).send(newEventObj);
  });

app.get('/groups', (req, res) => {
  res.status(200).send(stub.groups);
});

app.get('/users', (req, res) => {
  res.status(200).send(stub.users);
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
