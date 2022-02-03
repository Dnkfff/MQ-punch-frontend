/** @module containers/Game/services/classes/DuelContoller/duelAlgorithms */

import { Vector3 } from 'three';

import boxerParameters from '../../constants/boxerParameters';
import { specialAnimationNames } from '../../constants/boxerAnimations';

/**
  @summary Switches given boxer leading side if it requests the appropriate animation
  @param boxer Boxer instance
  @param boxerMovement requested animation name
*/
export const switchBoxerLeadingSide = (boxer, boxerMovement) => {
  if (boxerMovement.movement.whole === specialAnimationNames.switchLeadingSide) {
    boxer.switchLeadingSide();
  }
};

/**
  @summary Moves boxer in direction according to specified movement
  so boxers will locate at normal distance
  @description Makes boxers stay at efficient distance changing sizes of their steps.
  @param boxer boxer
  @param opponent boxer's opponent
  @param boxerMovement requested animation name
*/
export const moveBoxer = (boxer, opponent, boxerMovement) => {
  let movementDirection;
  let stepCoefficient;

  // calculating distance from the boxer to his opponent
  const distance = boxer.distanceTo(opponent);

  // movement forward
  if (boxerMovement.movement.lower === specialAnimationNames.movementForward) {
    movementDirection = new Vector3(0.0, 0.0, 1.0);
    stepCoefficient = Math.min(
      distance / (boxerParameters.scale * boxerParameters.idealDistance),
      2.0
    );
  }

  // movement backward
  else if (boxerMovement.movement.lower === specialAnimationNames.movementBackward) {
    movementDirection = new Vector3(0.0, 0.0, -1.0);
    stepCoefficient = (boxerParameters.scale * boxerParameters.idealDistance) / distance;
  }

  // movement to the left
  else if (boxerMovement.movement.lower === specialAnimationNames.movementLeft) {
    movementDirection = new Vector3(-1.0, 0.0, 0.0);
    stepCoefficient = 1.0;
  }

  // movement to the right
  else if (boxerMovement.movement.lower === specialAnimationNames.movementRight) {
    movementDirection = new Vector3(1.0, 0.0, 0.0);
    stepCoefficient = 1.0;
  }

  // return if boxer does not need to movement
  else {
    return;
  }

  // move the boxer
  boxer.move(movementDirection, stepCoefficient);
};
