import { Drone } from './../../../../commons/models/drone.model';
import { randomDroneMovement } from './../../../../commons/helpers/random/random-drone-movement';

export class DroneG extends Drone {

  get id(): string { return super.id };
  set id(v: string) { super.id = v; }

  get quadrant(): string { return super.quadrant };
  set quadrant(v: string) { super.quadrant = v; }

  get positionX(): number { return super.positionX };
  set positionX(v: number) { super.positionX = v; }

  get positionY(): number { return super.positionY };
  set positionY(v: number) { super.positionY = v; }

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
