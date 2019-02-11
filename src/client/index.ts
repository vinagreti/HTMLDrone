import { WebSocketService } from './shared/services/web-socket-rx/web-socket-rx.service';
import { HTMLDrone } from './shared/components/drone/drone';
import { HTMLQuadrantViewer } from './shared/components/quadrant/quadrant';
import { DroneG } from '../server/shared/componens/drone/drone';

const appDiv: HTMLElement = document.getElementById('main-app') as HTMLElement;

const quadrant1 = new HTMLQuadrantViewer();

appDiv.appendChild(quadrant1);

class mainApp {

  private wsServer!: WebSocketService;

  private drones: HTMLDrone[] = [];

  constructor() {
    console.log('Main app working!');
    this.initWsService();
    this.establishWsConnection();
  }

  initWsService() {
    this.wsServer = new WebSocketService();
  }

  establishWsConnection() {
    this.wsServer.connect('ws://localhost:2019/position')
    .subscribe(
      (drones: any[]) => {

        this.updateQuadrantDronesData(drones);

        this.updateQuadrantDrones();

      }, (err: any) => {

        console.error('err', err);

      },

    )

  }

  private updateQuadrantDrones() {

    quadrant1.clear();

    this.drones.forEach((drone: HTMLDrone) => {

      quadrant1.appendDrone(drone);

    });

  }

  private updateQuadrantDronesData(arrivedDrones: DroneG[] = []) {

    const arrivedDronesIds = arrivedDrones.map(drone => drone.id);

    const listWithoutRemovedDrones = this.drones.filter(drone => arrivedDronesIds.includes(drone.id));

    const listWithoutRemovedDronesIds = listWithoutRemovedDrones.map(drone => drone.id);

    const listWithoutRemovedDronesUpdated = listWithoutRemovedDrones.map(drone => {

      const newDroneData = arrivedDrones.find(arrivedDrone => arrivedDrone.id === drone.id);

      this.configDrone(drone, newDroneData);

      return drone;

    });

    const newDronesList = arrivedDrones.filter(drone => !listWithoutRemovedDronesIds.includes(drone.id)).map(drone => this.createAndConfigureHTMLDrone(drone));

    const newDronesconfiguration = [
      ...listWithoutRemovedDronesUpdated,
      ...newDronesList,
    ];

    this.drones = newDronesconfiguration;


  }

  private createAndConfigureHTMLDrone = (data: any = {}) => {

    const newDrone = new HTMLDrone();

    this.configDrone(newDrone, data);

    return newDrone;

  }

  private configDrone = (drone: HTMLDrone, data: any = {}) => {

    drone.id = data.id;

    drone.quadrant = data.quadrant;

    drone.positionX = data.positionX;

    drone.positionY = data.positionY;

  }

}

new mainApp();
