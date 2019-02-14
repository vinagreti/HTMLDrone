import { MainServer } from './main';
import { expect } from 'chai';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let serverInstance: MainServer;

describe('Static Routes', () => {

  before((done) => {
    serverInstance = new MainServer();
    setTimeout(() => {
      done();
    }, 0);
  })

  after((done) => {
    serverInstance.server.close();
    setTimeout(() => {
      done();
    }, 0); // waits for the server to closes before goes to next file
  });

  it('it should return the document in the root path', (done) => {

    chai.request(serverInstance.server)
      .get('/')
      .end((err: any, res: any) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.be.a('object');
        expect(res.text).to.contain('<!DOCTYPE html>');
        expect(res.text).to.contain('main-app');
        done();
      });
  });

  it('it should return no content for undefined routes', (done) => {
    chai.request(serverInstance.server)
      .get('/anythingelse')
      .end((err: any, res: any) => {
        expect(res.status).to.be.eql(404);
        expect(res.body).to.be.a('object');
        expect(res.text).to.be.eql('no content');
        done();
      });
  });

});
