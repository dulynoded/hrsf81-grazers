const server = require('../server/server.js');
const supertest = require('supertest');

const request = supertest.agent(server);

describe('Server Attendee Spec', () => {
  it('should get all attendee', (done) => {
    request
      .get('/attendee')
      .expect(200, done);
  });

  it('should get attendee by specific userId', (done) => {
    request
      .get('/attendee/3')
      .expect(200, done);
  });

  it('should create attendee', (done) => {
    const attendeeParams = {
      role: 'attendee',
      firstname: 'foo',
      lastname: 'bar',
      email: 'foobar@foobar.com',
      phone_number: 1234567890
    };

    request
      .post('/attendee', attendeeParams)
      .expect(201, done);
  });
});
