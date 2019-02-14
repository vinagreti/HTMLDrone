import { Drone } from './../../../../commons/models/drone.model';
import { randomDroneMovement } from './../../../../commons/helpers/random/random-drone-movement';

export class DroneG extends Drone {

  constructor(data: any = {}) {

    super(data);

    this.move();

  }

  private move() {

    setInterval(() => {

      randomDroneMovement(this);

    }, 500);

  }

}
