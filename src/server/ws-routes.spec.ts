import { MainServer } from './main';
import { expect } from 'chai';

var WebSocket = require('ws');

const serverInstance: MainServer = new MainServer();

const socketUrl = `ws://localhost:${serverInstance.port}/position`;

describe('WS Routes', function () {

  let socket: any;

  beforeEach((done) => {

    socket = new WebSocket(socketUrl);

    socket.onerror = (err: any) => {
      console.log('WS error', err);
    };

    socket.onclose = () => {
      console.log('WS closed');
      done();
    };

    socket.onopen = () => {
      done();
    };

  });

  it('should return drones array', (done) => {
    socket.onmessage = (message: any) => {
      const messageData = JSON.parse(message.data || '');
      expect(messageData).to.be.a('array');
      done();
    };
  });

});