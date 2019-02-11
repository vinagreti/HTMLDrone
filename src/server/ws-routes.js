"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drone_service_1 = require("./shared/services/drone/drone.service");
const CONNECTIONS = {};
var wsRoutes;
(function (wsRoutes) {
    wsRoutes["dronePosition"] = "/position";
})(wsRoutes || (wsRoutes = {}));
class WsRoutes {
    constructor(server, droneService = new drone_service_1.DroneService()) {
        this.server = server;
        this.droneService = droneService;
        this.appendRoutes();
    }
    appendRoutes() {
        this.server.app.ws(wsRoutes.dronePosition, (ws, req) => {
            const operation$ = CONNECTIONS[wsRoutes.dronePosition] || this.droneService.list();
            this.registerClient(ws, operation$);
        });
    }
    registerClient(ws, operation$) {
        operation$.subscribe(res => {
            if (ws.readyState === 1) {
                if (typeof res === 'object') {
                    ws.send(JSON.stringify(res));
                }
                else {
                    ws.send(res);
                }
            }
            else {
                ws.close();
            }
        });
    }
}
exports.WsRoutes = WsRoutes;
//# sourceMappingURL=ws-routes.js.map