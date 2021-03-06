/** @module containers/Game/services/constants/boxerAnimations */

/**
  @brief The object of boxer animation objects
  @description Each object has its
  name (animation name),
  looped (the flag is enabled if animation can be looped if there is no next animation requested),
  type (appropriate body part: lower, upper or whole),
  idle (the flag is enabled if it can be used as idle animation).
*/
const boxerAnimations = [
  {
    name: 'fighting-idle-1-lower-body',
    looped: true,
    type: 'lower',
    idle: true,
  },
  {
    name: 'fighting-idle-1-upper-body',
    looped: true,
    type: 'upper',
    idle: true,
  },
  {
    name: 'fighting-idle-2-lower-body',
    looped: true,
    type: 'lower',
    idle: true,
  },
  {
    name: 'fighting-idle-2-upper-body',
    looped: true,
    type: 'upper',
    idle: true,
  },
  {
    name: 'switch-leading-side',
    looped: false,
    type: 'whole',
    idle: false,
  },
  {
    name: 'step-forward',
    looped: false,
    type: 'lower',
    idle: false,
  },
  {
    name: 'step-backward',
    looped: false,
    type: 'lower',
    idle: false,
  },
  {
    name: 'step-to-the-left',
    looped: false,
    type: 'lower',
    idle: false,
  },
  {
    name: 'step-to-the-right',
    looped: false,
    type: 'lower',
    idle: false,
  },
  {
    name: 'slip-left',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'slip-right',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'roll-left',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'roll-right',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'dive-left',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'dive-right',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'block-up-left',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'block-up-right',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'block-down-left',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'block-down-right',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'block-front',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'miss-up-left',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'miss-up-right',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'miss-down-left',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'miss-down-right',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'miss-front',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'jab',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'cross-up-left',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'cross-up-right',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'cross-down-left',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'cross-down-right',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'hook-up-left',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'hook-up-right',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'hook-down-left',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'hook-down-right',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'uppercut-up-left',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'uppercut-up-right',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'uppercut-down-left',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'uppercut-down-right',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'overhand-left',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'overhand-right',
    looped: false,
    type: 'upper',
    idle: false,
  },
  {
    name: 'falling-forward',
    looped: false,
    type: 'whole',
    idle: false,
  },
  {
    name: 'falling-backward',
    looped: false,
    type: 'whole',
    idle: false,
  },
  {
    name: 'getting-up-forward',
    looped: false,
    type: 'whole',
    idle: false,
  },
  {
    name: 'getting-up-backward',
    looped: false,
    type: 'whole',
    idle: false,
  },
  {
    name: 'standing-1',
    looped: false,
    type: 'whole',
    idle: false,
  },
  {
    name: 'standing-2',
    looped: false,
    type: 'whole',
    idle: false,
  },
  {
    name: 'warming-up-1',
    looped: true,
    type: 'whole',
    idle: false,
  },
  {
    name: 'warming-up-2',
    looped: true,
    type: 'whole',
    idle: false,
  },
  {
    name: 'victory-1',
    looped: false,
    type: 'whole',
    idle: false,
  },
  {
    name: 'victory-2',
    looped: false,
    type: 'whole',
    idle: false,
  },
  {
    name: 'defeat-1',
    looped: false,
    type: 'whole',
    idle: false,
  },
  {
    name: 'defeat-2',
    looped: false,
    type: 'whole',
    idle: false,
  },
];

/**
  @brief Names of special animations
*/
export const specialAnimationNames = {
  switchLeadingSide: 'switch-leading-side',
  movementForward: 'step-forward',
  movementBackward: 'step-backward',
  movementLeft: 'step-to-the-left',
  movementRight: 'step-to-the-right',
};

export default boxerAnimations;
