"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web_socket_rx_service_1 = require("./shared/services/web-socket-rx/web-socket-rx.service");
const drone_1 = require("./shared/components/drone/drone");
const quadrant_1 = require("./shared/components/quadrant/quadrant");
const appDiv = document.getElementById('main-app');
const quadrant1 = new quadrant_1.HTMLQuadrantViewer();
appDiv.appendChild(quadrant1);
class mainApp {
    constructor() {
        this.drones = [];
        this.createAndConfigureHTMLDrone = (data = {}) => {
            const newDrone = new drone_1.HTMLDrone();
            this.configDrone(newDrone, data);
            return newDrone;
        };
        this.configDrone = (drone, data = {}) => {
            drone.id = data.id;
            drone.quadrant = data.quadrant;
            drone.positionX = data.positionX;
            drone.positionY = data.positionY;
        };
        console.log('Main app working!');
        this.initWsService();
        this.establishWsConnection();
    }
    initWsService() {
        this.wsServer = new web_socket_rx_service_1.WebSocketService();
    }
    establishWsConnection() {
        this.wsServer.connect('ws://localhost:2019/position')
            .subscribe((drones) => {
            this.updateQuadrantDronesData(drones);
            this.updateQuadrantDrones();
        }, (err) => {
            console.error('err', err);
        });
    }
    updateQuadrantDrones() {
        quadrant1.clear();
        this.drones.forEach((drone) => {
            quadrant1.appendDrone(drone);
        });
    }
    updateQuadrantDronesData(arrivedDrones = []) {
        const arrivedDronesIds = arrivedDrones.map(drone => drone.id);
        const listWithoutRemovedDrones = this.drones.filter(drone => arrivedDronesIds.includes(drone.id));
        const listWithoutRemovedDronesIds = listWithoutRemovedDrones.map(drone => drone.id);
        const listWithoutRemovedDronesUpdated = listWithoutRemovedDrones.map(drone => {
            const newDroneData = arrivedDrones.find(arrivedDrone => arrivedDrone.id === drone.id);
            this.configDrone(drone, newDroneData);
            return drone;
        });
        const newDronesList = arrivedDrones.filter(drone => !listWithoutRemovedDronesIds.includes(drone.id)).map(drone => this.createAndConfigureHTMLDrone(drone));
        const newDronesconfiguration = [
            ...listWithoutRemovedDronesUpdated,
            ...newDronesList,
        ];
        this.drones = newDronesconfiguration;
    }
}
new mainApp();
//# sourceMappingURL=index.js.map