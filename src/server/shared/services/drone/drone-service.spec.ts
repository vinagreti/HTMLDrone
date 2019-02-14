import { expect } from 'chai';
import { DroneService } from './drone.service';
import { Drone } from '../../../../commons/models/drone.model';
import { first } from 'rxjs/operators';

const serverInstance: DroneService = new DroneService();


describe('Drone Service', () => {

  it('should list drones array', (done) => {

    serverInstance.list()
    .pipe(first())
    .subscribe((drones: Drone[]) => {

      expect(drones).to.be.a('array');

      done();

    });

  });

});
