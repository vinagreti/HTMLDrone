import { template } from './drone.template';
import { style } from './drone.style';

import { CustomElement } from './../../../shared/decorators/custom-element';
import { Drone } from './../../../../commons/models/drone.model';

@CustomElement({
  selector: 'drone-g',
  template,
  style,
  useShadow: true
})
export class HTMLDrone extends HTMLElement implements Drone {

  private _id!: string;

  private _quadrant!: number;

  private _positionX!: number;

  private _positionY!: number;

  constructor() {
    super();
  }

  get id() { return this._id; }
  set id(position) {
    if (this._id !== position) {
      this._id = position;
    }
  }

  get quadrant() { return this._quadrant; }
  set quadrant(position) {
    if (this._quadrant !== position) {
      this._quadrant = position;
    }
  }

  get positionX() { return this._positionX; }
  set positionX(position) {

    if (this._positionX !== position) {

      this._positionX = position;

      setTimeout(() => {
        if (this.shadowRoot && position >= 0) {
          const droneWrapper = this.shadowRoot.getElementById('drone-wrapper');
          droneWrapper && (droneWrapper.style.left = `${position / 10}%`);
        }
      }, 0);

    }

  }

  get positionY() { return this._positionY; }
  set positionY(position) {

    if (this._positionY !== position) {

      this._positionY = position;

      setTimeout(() => {
        if (this.shadowRoot && position >= 0) {
          const droneWrapper = this.shadowRoot.getElementById('drone-wrapper');
          droneWrapper && (droneWrapper.style.top = `${position / 10}%`);
        }
      }, 0);

    }

  }

}
