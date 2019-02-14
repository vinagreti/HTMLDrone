import { randomFromZero } from './../helpers/random/random';

// x, y are coords
// (values sent as strings, but must be treated as floating point number)
export class Drone {
  public id: string;
  public quadrant: string;
  public positionX: number;
  public positionY: number;

  constructor(data: any = {}) {
    this.id = data.id;
    this.quadrant = data.quadrant;
    this.positionX = parseFloat(data.positionX || randomFromZero(1000));
    this.positionY = parseFloat(data.positionY || randomFromZero(1000));
  }

}