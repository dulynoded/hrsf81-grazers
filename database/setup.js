const { Pool } = require('pg');
const config = require('./config');
const db = require('./index');
const seed = require('./seedData');

const pool = new Pool(config);

pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL UNIQUE NOT NULL PRIMARY KEY, role VARCHAR(80), firstName VARCHAR(80), lastName VARCHAR(80), email VARCHAR(80), phoneNumber VARCHAR(80))')
  .then(() => pool.query('CREATE TABLE IF NOT EXISTS events (id SERIAL UNIQUE NOT NULL PRIMARY KEY, name VARCHAR(80), location VARCHAR(80), organizer_id SERIAL REFERENCES users(id), schedule_id INTEGER)'))
  .then(() => pool.query('CREATE TABLE IF NOT EXISTS groups (id SERIAL UNIQUE NOT NULL PRIMARY KEY, name VARCHAR(80), type VARCHAR(80), event_id SERIAL REFERENCES events(id), schedule_id INTEGER)'))
  .then(() => pool.query('CREATE TABLE IF NOT EXISTS schedules (id SERIAL UNIQUE NOT NULL PRIMARY KEY, date VARCHAR(80), event_id SERIAL REFERENCES events(id))'))
  .then(() => pool.query('CREATE TABLE IF NOT EXISTS activities (id SERIAL UNIQUE NOT NULL PRIMARY KEY, time VARCHAR(80), activity VARCHAR(80), location VARCHAR(80), schedule_id SERIAL REFERENCES schedules(id))'))
  // .then(() => pool.query('CREATE TABLE IF NOT EXISTS group_activity (group_id SERIAL NOT NULL REFERENCES groups(id), activity_id SERIAL NOT NULL REFERENCES activities(id), PRIMARY KEY (group_id, activity_id))'))
  .then(() => pool.query('CREATE TABLE IF NOT EXISTS group_user (group_id SERIAL NOT NULL REFERENCES groups(id), user_id SERIAL NOT NULL REFERENCES users(id), PRIMARY KEY (group_id, user_id))'))
  .then(() => pool.query('CREATE TABLE IF NOT EXISTS messages (id SERIAL UNIQUE NOT NULL PRIMARY KEY, from_user_id SERIAL REFERENCES users(id), to_group_id SERIAL REFERENCES groups(id), title VARCHAR(80) NOT NULL, text VARCHAR(140), event_id SERIAL REFERENCES events(id), date_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, msg_group_id INTEGER)'))
  .then(() => db.addUser(seed.organizer))
  .then(() => Promise.all(seed.users.map(user => db.addUser(user))))
  .then(() => Promise.all(seed.events.map(event => db.addEvent(event))))
  .then(() => Promise.all(seed.groups.map(group => db.addGroup(group))))
  .then(() => Promise.all(seed.schedules.map(schedule => db.addSchedule(schedule))))
  .then(() => Promise.all(seed.activities.map(activity => db.addActivity(activity))))
  .then(() => Promise.all(seed.userGroups.map(userGroup =>
    db.addUserToGroup(userGroup.groupId, userGroup.userId))))
  .then(() => Promise.all(seed.messages.map(message => db.addMessage(message))))
  .then(() => {
    console.log('DB: tables created and seeded with data');
  })
  .catch(console.error);
