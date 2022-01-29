/** @module containers/Game/services/classes/DuelContoller/duelAlgorithms */

import { Vector3 } from "three";

import boxerParameters from "../../constants/boxerParameters";
import { specialAnimationNames } from "../../constants/boxerAnimations";

/**
  @summary Switches given boxer leading side if it requests the appropriate animation
  @param boxer Boxer instance
  @param boxerMove requested animation name
*/
export const switchBoxerLeadingSide = (boxer, boxerMove) => {
  if (boxerMove.move.whole === specialAnimationNames.switchLeadingSide) {
    boxer.switchLeadingSide();
  }
};

/**
  @summary Moves boxer in direction according to specified move so boxers will locate at normal distance
  @description The function will make boxer models to stay at efficient distance
  changing step size.
  @param boxer boxer
  @param boxerMove requested animation name
  @param opponent boxer's opponent
*/
export const moveBoxer = (boxer, opponent, boxerMove) => {
  let moveDirection;
  let stepCoefficient;

  const distance = boxer.distanceTo(opponent);

  if (boxerMove.move.lower === specialAnimationNames.moveForward) {
    // move forward
    moveDirection = new Vector3(0.0, 0.0, 1.0);
    stepCoefficient = Math.min(
      distance / (boxerParameters.scale * boxerParameters.idealDistance),
      2.0
    );
  } else if (boxerMove.move.lower === specialAnimationNames.moveBackward) {
    // move backward
    moveDirection = new Vector3(0.0, 0.0, -1.0);
    stepCoefficient =
      (boxerParameters.scale * boxerParameters.idealDistance) / distance;
  } else if (boxerMove.move.lower === specialAnimationNames.moveLeft) {
    // move left
    moveDirection = new Vector3(-1.0, 0.0, 0.0);
    stepCoefficient = 1.0;
  } else if (boxerMove.move.lower === specialAnimationNames.moveRight) {
    // move right
    moveDirection = new Vector3(1.0, 0.0, 0.0);
    stepCoefficient = 1.0;
  } else {
    // return if boxer does not need to move
    return;
  }

  boxer.move(moveDirection, stepCoefficient);
};
