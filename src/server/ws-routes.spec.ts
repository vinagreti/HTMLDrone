import { MainServer } from './main';
import { expect } from 'chai';

const WebSocket = require('ws');

let serverInstance: MainServer;
let socketUrl: string;
let socket: WebSocket;

describe('WS Routes', () => {

  before((done) => {

    serverInstance = new MainServer();

    socketUrl = `ws://localhost:${serverInstance.port}/position`;

    socket = new WebSocket(socketUrl);

    socket.onerror = (err: any) => {
      console.log('WS error', err);
      done();
    };

    socket.onclose = () => {
      console.log('WS closed');
      done();
    };

    socket.onopen = () => {
      setTimeout(() => {
        done();
      }, 500);
    };

  });

  after((done) => {
    serverInstance.server.close();
    setTimeout(() => {
      done();
    }, 0);
  });

  it('should return drones array', (done) => {
    socket.onmessage = (message: any) => {
      const messageData = JSON.parse(message.data || '');
      expect(messageData).to.be.a('array');
      done();
    };
  });

});
