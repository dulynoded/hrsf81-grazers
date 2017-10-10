const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config);

const addUser = user =>
  pool.query(
    'INSERT INTO users(role, firstname, lastname, email, phonenumber) values($1, $2, $3, $4, $5)',
    [user.role, user.firstName, user.lastName, user.email, user.phone]
  );

const addEvent = event =>
  pool.query(
    'INSERT INTO events(name, location, organizer_id, schedule_id) values($1, $2, $3, $4)',
    [event.name, event.location, event.organizerId, event.scheduleId]
  );

const addSchedule = schedule =>
  pool.query(
    'INSERT INTO schedules(date, time, activity, location, group_id) values($1, $2, $3, $4, $5)',
    [schedule.date, schedule.time, schedule.activity, schedule.location, schedule.groupId]
  );

const addGroup = group =>
  pool.query(
    'INSERT INTO groups(name, type, event_id, schedule_id) values($1, $2, $3, $4)',
    [group.name, group.type, group.eventId, group.scheduleId]
  );

const addUserToGroup = (groupId, userId) =>
  pool.query(
    'INSERT INTO group_user(group_id, user_id) values($1, $2)',
    [groupId, userId]
  );

const addMessage = (message) => {
  const messageInserts = message.toIds.map(recipientId =>
    pool.query(
      'INSERT INTO messages(from_user_id, to_group_id, title, text, event_id, date_time, msg_group_id) values($1, $2, $3, $4, $5, $6, $7)',
      [message.fromId, recipientId, message.title, message.text, message.eventId, message.timestamp, message.msgGroupId]
    ));

  return Promise.all(messageInserts);
};

const getAllUsers = () =>
  pool.query('SELECT * FROM users');

const getAllEvents = () =>
  pool.query('SELECT * FROM events');

const getAllSchedules = () =>
  pool.query('SELECT * FROM schedules');

const getAllGroups = () =>
  pool.query('SELECT * FROM groups');

const getAllMessages = () =>
  pool.query('SELECT * FROM messages');

const getMessages = (fromId, toId) =>
  pool.query(`SELECT firstname, lastname, string_agg(name,'|') AS togroups, title, text, date_time
     FROM messages
     JOIN users ON messages.from_user_id = users.id
     ${fromId ? `AND messages.from_user_id = ${fromId}` : ''}
     JOIN groups ON messages.to_group_id = groups.id AND messages.event_id = groups.event_id
     ${toId ? `AND messages.to_group_id = ${toId}` : ''}
     GROUP BY msg_group_id, title, text, firstname, lastname, from_user_id, date_time
     ORDER BY date_time`);


module.exports = {
  addUser,
  addEvent,
  addSchedule,
  addGroup,
  addUserToGroup,
  addMessage,
  getAllUsers,
  getAllEvents,
  getAllSchedules,
  getAllGroups,
  getAllMessages,
  getMessages
};
