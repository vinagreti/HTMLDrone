import { expect } from 'chai';
import { MainServer } from './main';
import { environment } from './environments/environments';

describe('MainServer', () => {

  const server: MainServer = new MainServer();;

  it(`should create express app`, () => {
    expect(!!server.app).to.equal(true);
  });

  it(`should create http server`, () => {
    expect(!!server.server).to.equal(true);
  });

  it(`should be listening on ${environment.name} env at port ${environment.port}`, () => {
    expect(server.port).to.equal(environment.port);
  });

});