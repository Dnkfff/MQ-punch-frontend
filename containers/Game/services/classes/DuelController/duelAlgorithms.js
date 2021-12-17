/** @module containers/Game/services/classes/DuelContoller/duelAlgorithms */

import ringParameters from "../../constants/ringParameters";
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
  @summary Calculate coefficient to change step size according two the distance between boxers
  @description Greater than 1 if the distance is greater than efficient and less if on the countrary.
  @param leftBoxer
  @param rightBoxer
  @returns the distance coefficient
*/
export const calculateDistanceCoefficient = (leftBoxer, rightBoxer) => {
  const distance = leftBoxer.getDistance(rightBoxer);

  return Math.min(
    distance / (boxerParameters.scale * boxerParameters.normalDistance),
    2.0
  );
};

/**
  @summary Calculate coefficient to change step size according two the distance between boxers
  @description The function will manage boxer models to stay at efficient distance
  changing step size.
  @param boxer Boxer instance
  @param boxerMove requested animation name
  @param coefficient the distance coefficient
*/
export const moveBoxer = (boxer, boxerMove, coefficient) => {
  const border = boxerParameters.scale * boxerParameters.stepSize;
  const borders = {
    x: {
      min: border,
      max: ringParameters.canvas.width - border,
    },
    z: {
      min: border,
      max: ringParameters.canvas.width - border,
    },
  };

  if (boxerMove.move.lower === specialAnimationNames.moveForward) {
    boxer.move("forward", borders, coefficient);
  } else if (boxerMove.move.lower === specialAnimationNames.moveBackward) {
    boxer.move("backward", borders, 1.0 / coefficient);
  } else if (boxerMove.move.lower === specialAnimationNames.moveLeft) {
    boxer.move("left", borders, 1.0);
  } else if (boxerMove.move.lower === specialAnimationNames.moveRight) {
    boxer.move("right", borders, 1.0);
  }
};
