"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drone_model_1 = require("./../../../../commons/models/drone.model");
const random_drone_movement_1 = require("./../../../../commons/helpers/random/random-drone-movement");
class DroneG extends drone_model_1.Drone {
    constructor(data = {}) {
        super(data);
        this.move();
    }
    move() {
        setInterval(() => {
            random_drone_movement_1.randomDroneMovement(this);
        }, 500);
    }
}
exports.DroneG = DroneG;
//# sourceMappingURL=drone.js.map