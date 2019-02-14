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

    socket.onclose = () => { // make sure the test continues
      console.log('WS closed');
      done();
    };

    socket.onopen = () => {
      setImmediate(() => { // ensures socket will be ready for testing
        done();
      });
    };

  });

  after((done) => {
    serverInstance.server.close();
    setTimeout(() => {
      done();
    }, 0); // waits for the server to closes before goes to next file
  });

  it('should return drones array', (done) => {
    socket.onmessage = (message: any) => {
      const messageData = JSON.parse(message.data || '');
      expect(messageData).to.be.a('array');
      done();
    };
  });

});
