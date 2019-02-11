"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = require("./random");
const directions = {};
exports.randomDroneMovement = (drone) => {
    drone.id = drone.id || `${random_1.randomFromZero(1000)}-${random_1.randomFromZero(1000)}-${random_1.randomFromZero(1000)}`;
    let nextPosition;
    directions[drone.id] = directions[drone.id] || {
        positionX: random_1.chooseOneRandomly('front', 'back'),
        positionY: random_1.chooseOneRandomly('front', 'back'),
    };
    const ramdomCoord = random_1.chooseOneRandomly('positionX', 'positionY');
    const currentCoordValue = drone[ramdomCoord];
    const currentDroneDirection = directions[drone.id][ramdomCoord];
    if (currentDroneDirection === 'front') {
        const possibleNextPositionForward = currentCoordValue + 1;
        if (possibleNextPositionForward < 900) {
            nextPosition = possibleNextPositionForward;
        }
        else {
            directions[drone.id][ramdomCoord] = 'back';
            nextPosition = currentCoordValue - 1;
        }
    }
    else {
        const possibleNextPositionBackward = currentCoordValue - 1;
        if (possibleNextPositionBackward > 100) {
            nextPosition = possibleNextPositionBackward;
        }
        else {
            const nextValue = currentCoordValue + 1;
            directions[drone.id][ramdomCoord] = 'front';
            nextPosition = nextValue;
        }
    }
    drone[ramdomCoord] = nextPosition;
};
//# sourceMappingURL=random-drone-movement.js.map