import { DroneService } from '../../shared/services/drone/drone.service';
import { HTMLQuadrantViewer } from '../../shared/components/quadrant/quadrant';
import { HTMLDrone } from '../../shared/components/drone/drone';

export class DronesMapPage {

  private dronesService = new DroneService();

  quadrants: { [key: string]: HTMLQuadrantViewer } = {}

  constructor(
    private outlet: HTMLElement
  ) {

    console.log('Drones map started!');

    this.initQuadrants();

  }

  private initQuadrants() {

    const quadrants = ['1'];

    quadrants.forEach(quadrantId => {

      this.initQuadrant(quadrantId);

    });

  }

  private initQuadrant(quadrantId: string) {

    this.appendQuadrant(quadrantId);

    this.connectToDronesStream(quadrantId);

  }

  private appendQuadrant(quadrantId: string) {

    this.quadrants[quadrantId] = new HTMLQuadrantViewer();

    this.quadrants[quadrantId].id = quadrantId;

    this.outlet.appendChild(this.quadrants[quadrantId]);

  }

  private connectToDronesStream(quadrantId: string) {

    this.dronesService.drones(quadrantId)
      .subscribe(
        (drones: HTMLDrone[]) => {

          this.quadrants[quadrantId].drones = drones;

        }, err => {

          console.error('err', err);

        });

  }


}
