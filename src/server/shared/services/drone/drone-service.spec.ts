import { expect } from 'chai';
import { DroneService } from './drone.service';
import { Drone } from '../../../../commons/models/drone.model';

const serverInstance: DroneService = new DroneService();


describe('Drone Service', function () {

  it('should list drones array', (done) => {

    serverInstance.list().subscribe((drones: Drone[]) => {

      expect(drones).to.be.a('array');

      done();

    });

  });

});