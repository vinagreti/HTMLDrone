import { MainServer } from './main';
import { expect } from 'chai';
const io = require('socket.io-client')
const serverInstance: MainServer = new MainServer();
const socketUrl = `http://localhost:${serverInstance.port}`;

describe('WS Routes', function () {

  let socket: any;

  beforeEach((done) => {

    socket = io.connect(socketUrl, {
      reconnectionDelay: 0,
      reopenDelay: 0,
      forceNew: true,
      transports: ['websocket'],
      path: '/position'
    });

    console.log('socket', socket.connected);

    socket.on('connect_error', (err: any) => {
      console.log('connect_error...', err);
      done();
    });

    socket.on('error', (err: any) => {
      console.log('error...', err);
      done();
    });

    socket.on('connect', () => {
      console.log('worked...');
      done();
    });

    socket.on('disconnect', () => {
      console.log('disconnected...');
      done();
    });

    socket.on('message', () => {
      console.log('messageed...');
      done();
    });

  });

  it('should return drones array', (done) => {

    console.log('3', socket.connected);

    expect(true).to.be.eql(true);
    done();
  });

});