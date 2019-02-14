import { Observable } from 'rxjs';
import * as expressWs from 'express-ws';
import { DroneService } from './shared/services/drone/drone.service';

const CONNECTIONS: { [key: string]: Observable<any> | null } = {};

enum wsRoutes {
  dronePosition = '/position',
}

export class WsRoutes {

  constructor(

    private server: expressWs.Instance,

    private droneService: DroneService = new DroneService(),

  ) {

    this.appendRoutes();

  }

  private appendRoutes() {

    this.server.app.ws(wsRoutes.dronePosition, (ws, req) => {

      console.log('chamou aqui');

      const operation$ = CONNECTIONS[wsRoutes.dronePosition] || this.droneService.list();

      this.registerWsClientCallback(ws, operation$);

    });

  }

  private registerWsClientCallback(ws: any, operation$: Observable<any>) {

    operation$.subscribe(res => {

      if (ws.readyState === 1) {

        if (typeof res === 'object') {

          ws.send(JSON.stringify(res));

        } else {

          ws.send(res);

        }

      } else {

        ws.close();

      }

    });

  }

}
