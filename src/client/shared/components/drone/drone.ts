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

  private _quadrant!: string;

  private _positionX!: number;

  private _positionY!: number;

  private loaded = false;

  constructor() {
    super();
  }

  connectCallback() {
    console.log('loaded');
    this.loaded = true;
    this.refreshElementPositionX();
    this.refreshElementPositionY();
  }

  get quadrant() { return this._quadrant; }
  set quadrant(v) {

    if (this._quadrant !== v) {

      this._quadrant = v;

    }

  }

  get positionX() { return this._positionX; }
  set positionX(v) {

    if (this._positionX !== v) {

      this._positionX = v;

      this.refreshElementPositionX();

    }

  }

  get positionY() { return this._positionY; }
  set positionY(v) {

    if (this._positionY !== v) {

      this._positionY = v;

      this.refreshElementPositionY();

    }

  }

  patchValue(value: any = {}) {

    this.id = value.id;

    this.quadrant = value.quadrant;

    this.positionX = value.positionX;

    this.positionY = value.positionY;

    return this;

  }

  private refreshElementPositionX() {

    this.setStyle('left', `${this._positionX / 10}%`);

  }

  private refreshElementPositionY() {

    this.setStyle('top', `${this._positionY / 10}%`);

  }

  private setStyle(prop: any, value: any) {

    if (this.loaded && this.shadowRoot) {

      const droneWrapper = this.shadowRoot.getElementById('drone-wrapper');

      droneWrapper && (droneWrapper.style[prop] = value);

    }

  }

}
