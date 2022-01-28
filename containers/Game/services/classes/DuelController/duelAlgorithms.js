/** @module containers/Game/services/classes/DuelContoller/duelAlgorithms */

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
  @summary Calculate coefficient to change step size according two the distance between boxers
  @description The function will manage boxer models to stay at efficient distance
  changing step size.
  @param boxer Boxer instance
  @param boxerMove requested animation name
  @param coefficient the distance coefficient
*/
export const moveBoxer = (boxer, boxerMove) => {
  if (boxerMove.move.lower === specialAnimationNames.moveForward) {
    boxer.move("forward");
  } else if (boxerMove.move.lower === specialAnimationNames.moveBackward) {
    boxer.move("backward");
  } else if (boxerMove.move.lower === specialAnimationNames.moveLeft) {
    boxer.move("left");
  } else if (boxerMove.move.lower === specialAnimationNames.moveRight) {
    boxer.move("right");
  }
};
