const server = require('../server/server.js');
const supertest = require('supertest');
const WebSocket = require('ws');
const { expect } = require('chai');

const request = supertest.agent(server);

describe('Server Spec', () => {
  describe('GET /', () => {
    it('should return the content of index.html', (done) => {
      // For now just check that index.html has the title "Event HUD"
      request
        .get('/')
        .expect(200, /Event HUD/, done);
    });
  });

  describe('GET /event/:eventId/groups', () => {
    it('should return the groups associated with an event', (done) => {
      // For now just check that it returns something; when DB is hooked up, should confirm
      // results match DB contents
      request
        .get('/event/1/groups')
        .expect((res) => {
          if (res.body.length === 0) throw new Error('no results for groups');
        })
        .expect(200)
        .end(done);
    });
  });

  describe('Websocket Interface', () => {
    it('should establish a websocket connection', (done) => {
      const ws = new WebSocket('ws://localhost:3000');
      ws.on('open', () => {
        expect(ws.readyState).to.equal(WebSocket.OPEN);
        done();
      });
    });

    it('should upgrade to a websocket connection', (done) => {
      const ws = new WebSocket('ws://localhost:3000');
      ws.on('headers', (headers, response) => {
        expect(response.statusCode).to.equal(101);
        expect(headers.connection).to.equal('Upgrade');
        expect(headers.upgrade).to.equal('websocket');
        expect(headers['sec-websocket-accept']).to.exist;
        done();
      });
    });
  });
});
