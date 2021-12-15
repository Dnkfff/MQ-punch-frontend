import ringParameters from '../../constants/ringParameters';
import boxerParameters from '../../constants/boxerParameters';
import { specialAnimationNames } from '../../constants/boxerAnimations';


export const switchBoxerLeadingSide = (boxer, boxerMove) => {
  if (boxerMove.move.whole === specialAnimationNames.switchLeadingSide) {
    boxer.switchLeadingSide();
  }
};

export const calculateDistanceCoefficient = (leftBoxer, rightBoxer) => {
  const distance = leftBoxer.getDistance(rightBoxer);

  return Math.min(distance / (boxerParameters.scale * boxerParameters.normalDistance), 2.0);
};

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
    boxer.move('forward', borders, coefficient);
  } else if (boxerMove.move.lower === specialAnimationNames.moveBackward) {
    boxer.move('backward', borders, 1.0 / coefficient);
  } else if (boxerMove.move.lower === specialAnimationNames.moveLeft) {
    boxer.move('left', borders, 1.0);
  } else if (boxerMove.move.lower === specialAnimationNames.moveRight) {
    boxer.move('right', borders, 1.0);
  }
};
