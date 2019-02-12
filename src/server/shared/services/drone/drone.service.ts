import { Observable, timer, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DroneG } from './../../models/drone/drone';

const drones = [
  new DroneG({ quadrant: '1' }),
  new DroneG({ quadrant: '2' }),
  new DroneG({ quadrant: '1' }),
  new DroneG({ quadrant: '4' }),
  new DroneG({ quadrant: '1' }),
  new DroneG({ quadrant: '1' }),
  new DroneG({ quadrant: '3' }),
]

export class DroneService {

  list(): Observable<DroneG[]> {

    return timer(1, 30e3).pipe( // simulates a continuos info update

      switchMap(a => {

        return of(drones);

      })

    );

  }

}
