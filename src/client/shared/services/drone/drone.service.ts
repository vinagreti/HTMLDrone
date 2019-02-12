import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebSocketService } from '../web-socket-rx/web-socket-rx.service';
import { HTMLDrone } from '../../components/drone/drone';

export class DroneService {

  private wsServer!: WebSocketService;

  private dronesWsConnection!: Observable<HTMLDrone[]>;

  constructor() {

    console.log('Drone service started!');

    this.initWsService();

    this.connectToDronesWs();

  }

  drones(quadrantId: string): Observable<HTMLDrone[]> {

    return this.dronesWsConnection.pipe(
      map(drones => {
        return drones
          .filter(drone => drone.quadrant === quadrantId)
          .map(drone => (new HTMLDrone()).patchValue(drone));
      })
    );

  }

  private connectToDronesWs() {

    this.dronesWsConnection = this.wsServer.connect('ws://localhost:2019/position');

  }

  private initWsService() {

    this.wsServer = new WebSocketService();

  }

}
