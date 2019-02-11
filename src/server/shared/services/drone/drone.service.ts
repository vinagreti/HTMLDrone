import { Observable, timer, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DroneG } from './../../componens/drone/drone';

const drones = [
  new DroneG(),
  new DroneG(),
  new DroneG(),
  new DroneG(),
  new DroneG(),
  new DroneG(),
  new DroneG(),
]

export class DroneService {

  list(): Observable<DroneG[]> {

    return timer(1, 700).pipe( // simulates a continuos info update

      switchMap(a => {

        return of(drones);

      })

    );

  }

}
