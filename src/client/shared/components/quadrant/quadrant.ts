import { CustomElement } from './../../decorators/custom-element';
import { template } from './quadrant.template';
import { style } from './quadrant.style';
import { HTMLDrone } from './../drone/drone';

@CustomElement({
  selector: 'quadrant-viewer',
  template,
  style,
  useShadow: true
})
export class HTMLQuadrantViewer extends HTMLElement {

  public appendDrone(drone: HTMLDrone) {

    if (this.shadowRoot) {

      const quadrantWrapper = this.shadowRoot.getElementById('quadrant-wrapper');

      quadrantWrapper && quadrantWrapper.appendChild(drone);

    }

  }

  public clear() {

    if (this.shadowRoot) {

      const quadrantWrapper = this.shadowRoot.getElementById('quadrant-wrapper');

      if (quadrantWrapper) {

        while (quadrantWrapper.firstChild) quadrantWrapper.removeChild(quadrantWrapper.firstChild);

      }

    }
  }

}
