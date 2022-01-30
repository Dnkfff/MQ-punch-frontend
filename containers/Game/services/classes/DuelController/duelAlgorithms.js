/** @module containers/Game/services/classes/DuelContoller/duelAlgorithms */

import { Vector3 } from "three";

import boxerParameters from "../../constants/boxerParameters";
import { specialAnimationNames } from "../../constants/boxerAnimations";

/**
  @summary Switches given boxer leading side if it requests the appropriate animation
  @param boxer Boxer instance
  @param boxerMovement requested animation name
*/
export const switchBoxerLeadingSide = (boxer, boxerMovement) => {
  if (
    boxerMovement.movement.whole === specialAnimationNames.switchLeadingSide
  ) {
    boxer.switchLeadingSide();
  }
};

/**
  @summary Moves boxer in direction according to specified movement so boxers will locate at normal distance
  @description Makes boxers stay at efficient distance changing sizes of their steps.
  @param boxer boxer
  @param boxerMovement requested animation name
  @param opponent boxer's opponent
*/
export const moveBoxer = (boxer, opponent, boxerMovement) => {
  let movementDirection;
  let stepCoefficient;

  const distance = boxer.distanceTo(opponent);

  if (boxerMovement.movement.lower === specialAnimationNames.movementForward) {
    // movement forward
    movementDirection = new Vector3(0.0, 0.0, 1.0);
    stepCoefficient = Math.min(
      distance / (boxerParameters.scale * boxerParameters.idealDistance),
      2.0
    );
  } else if (
    boxerMovement.movement.lower === specialAnimationNames.movementBackward
  ) {
    // movement backward
    movementDirection = new Vector3(0.0, 0.0, -1.0);
    stepCoefficient =
      (boxerParameters.scale * boxerParameters.idealDistance) / distance;
  } else if (
    boxerMovement.movement.lower === specialAnimationNames.movementLeft
  ) {
    // movement left
    movementDirection = new Vector3(-1.0, 0.0, 0.0);
    stepCoefficient = 1.0;
  } else if (
    boxerMovement.movement.lower === specialAnimationNames.movementRight
  ) {
    // movement right
    movementDirection = new Vector3(1.0, 0.0, 0.0);
    stepCoefficient = 1.0;
  } else {
    // return if boxer does not need to movement
    return;
  }

  boxer.move(movementDirection, stepCoefficient);
};
