import { Drone } from "./../../models/drone.model";
import { randomFromZero, chooseOneRandomly } from "./random";

const directions: any = {};

export const randomDroneMovement = (drone: Drone) => {

  drone.id = drone.id || `${randomFromZero(1000)}-${randomFromZero(1000)}-${randomFromZero(1000)}`;

  let nextPosition;

  directions[drone.id] = directions[drone.id] || {
    positionX: chooseOneRandomly('front', 'back'),
    positionY: chooseOneRandomly('front', 'back'),
  };

  const ramdomCoord: 'positionX' | 'positionY' = chooseOneRandomly('positionX', 'positionY');

  const currentCoordValue: number = drone[ramdomCoord];

  const currentDroneDirection = directions[drone.id][ramdomCoord];

  if (currentDroneDirection === 'front') {

    const possibleNextPositionForward = currentCoordValue + 1;

    if (possibleNextPositionForward < 900) {

      nextPosition = possibleNextPositionForward;

    } else {

      directions[drone.id][ramdomCoord] = 'back';

      nextPosition = currentCoordValue - 1;

    }

  } else {

    const possibleNextPositionBackward = currentCoordValue - 1;

    if (possibleNextPositionBackward > 100) {

      nextPosition = possibleNextPositionBackward;

    } else {

      const nextValue = currentCoordValue + 1;

      directions[drone.id][ramdomCoord] = 'front';

      nextPosition = nextValue;

    }

  }

  drone[ramdomCoord] = nextPosition;

}
