"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const drone_1 = require("./../../componens/drone/drone");
const drones = [
    new drone_1.DroneG(),
    new drone_1.DroneG(),
    new drone_1.DroneG(),
    new drone_1.DroneG(),
    new drone_1.DroneG(),
    new drone_1.DroneG(),
    new drone_1.DroneG(),
];
class DroneService {
    list() {
        return rxjs_1.timer(1, 700).pipe(// simulates a continuos info update
        operators_1.switchMap(a => {
            return rxjs_1.of(drones);
        }));
    }
}
exports.DroneService = DroneService;
//# sourceMappingURL=drone.service.js.map