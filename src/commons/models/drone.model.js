"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = require("./../helpers/random/random");
// x, y are coords
// (values sent as strings, but must be treated as floating point number)
class Drone {
    constructor(data = {}) {
        this.id = data.id;
        this.quadrant = data.quadrant;
        this.positionX = parseFloat(data.positionX || random_1.randomFromZero(1000));
        this.positionY = parseFloat(data.positionY || random_1.randomFromZero(1000));
    }
}
exports.Drone = Drone;
//# sourceMappingURL=drone.model.js.map