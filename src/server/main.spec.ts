import { MainServer } from './main';
import { environment } from './environments/environments';
import { expect } from 'chai';

let serverInstance: MainServer;

describe('MainServer', () => {

  before(() => {
    serverInstance = new MainServer();
  })

  after((done) => {
    serverInstance.server.close();
    setTimeout(() => {
      done();
    }, 0);
  });

  it(`should create express app`, () => {
    expect(!!serverInstance.app).to.equal(true);
  });

  it(`should create http server`, () => {
    expect(!!serverInstance.server).to.equal(true);
  });

  it(`should be listening on ${environment.name} env at port ${environment.port}`, () => {
    expect(serverInstance.port).to.equal(environment.port);
  });

});
