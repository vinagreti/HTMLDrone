import { CustomElement } from './../../decorators/custom-element';
import { template } from './quadrant.template';
import { style } from './quadrant.style';
import { Quadrant } from './../../../../commons/models/quadrant.model';
import { HTMLDrone } from './../drone/drone';

@CustomElement({
  selector: 'quadrant-viewer',
  template,
  style,
  useShadow: true
})
export class HTMLQuadrantViewer extends HTMLElement implements Quadrant {

  get drones(): HTMLDrone[] { return this._drones; }
  set drones(v: HTMLDrone[]) {

    if (v !== this._drones) {

      this.refreshDronesData(v);

      this.updateVisibleDronesData();

    }

  }

  private _drones: HTMLDrone[] = [];

  private refreshDronesData(arrivedDrones: HTMLDrone[]) {

    const arrivedDronesIds = arrivedDrones.map(drone => drone.id);

    const localListWithoutRemovedDrones = this.drones.filter(drone => arrivedDronesIds.includes(drone.id));

    const localListWithoutRemovedDronesIds = localListWithoutRemovedDrones.map(drone => drone.id);

    const localListWithoutRemovedDronesUpdated = localListWithoutRemovedDrones.map(drone => {

      const newDroneData = arrivedDrones.find(arrivedDrone => arrivedDrone.id === drone.id);

      drone.patchValue(newDroneData);

      return drone;

    });

    const arrivedDronesWithoutDuplicated = arrivedDrones
      .filter(drone => !localListWithoutRemovedDronesIds.includes(drone.id))
      .map(drone => (new HTMLDrone()).patchValue(drone));

    const newDronesList = [
      ...localListWithoutRemovedDronesUpdated,
      ...arrivedDronesWithoutDuplicated,
    ];

    this._drones = newDronesList;

  }

  private updateVisibleDronesData() {

    this.clear();

    this.drones.forEach((drone: HTMLDrone) => {

      this.appendDrone(drone);

    });

  }

  private clear() {

    if (this.shadowRoot) {

      const quadrantWrapper = this.shadowRoot.getElementById('quadrant-wrapper');

      if (quadrantWrapper) {

        while (quadrantWrapper.firstChild) quadrantWrapper.removeChild(quadrantWrapper.firstChild);

      }

    }
  }

  public appendDrone(drone: HTMLDrone) {

    if (this.shadowRoot) {

      const quadrantWrapper = this.shadowRoot.getElementById('quadrant-wrapper');

      quadrantWrapper && quadrantWrapper.appendChild(drone);

    }

  }

}
