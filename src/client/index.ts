import { DronesMapPage } from './pages/drones-map/drones-map';

class MainApp {

  get page() { return this._page; }
  set page(v: any) {
    this._page = v;
  }

  private appContainerElement!: HTMLElement;

  private _page!: any;

  constructor() {

    console.log('Main app started!');

    this.findAppContainer();

    this.initDronesMap();

  }

  private findAppContainer() {

    this.appContainerElement = document.getElementById('main-app') as HTMLElement;

  }

  private initDronesMap() {

    this.page = new DronesMapPage(this.appContainerElement);

  }

}

(() => {
  new MainApp();
})();
