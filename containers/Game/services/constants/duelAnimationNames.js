/** @module containers/Game/services/constants/duelAnimationNames */

/**
  @brief The object of boxer probe animation names (for the upper body)
*/
export const probeAnimationNames = [
  "jab",
  "slip-left",
  "roll-left",
  "dive-left",
  "slip-right",
  "roll-right",
  "dive-right",
];

/**
  @brief The object of boxer offensive animation names (for the upper body)
  @description It contains
  bruteForceAttack,
  deceptiveAttack and
  counterAttack
  objects of appropriate animation names.
*/
export const offensiveAnimationNames = {
  bruteForceAttack: [
    "cross-up-left",
    "cross-up-right",
    "cross-down-left",
    "cross-down-right",
    "hook-up-left",
    "hook-up-right",
    "hook-down-left",
    "hook-down-right",
    "uppercut-up-left",
    "uppercut-up-right",
    "uppercut-down-left",
    "uppercut-down-right",
    "overhand-left",
    "overhand-right",
  ],
  deceptiveAttack: [
    "jab",
    "cross-up-left",
    "cross-up-right",
    "cross-down-left",
    "cross-down-right",
    "hook-up-left",
    "hook-up-right",
    "hook-down-left",
    "hook-down-right",
    "uppercut-up-left",
    "uppercut-up-right",
    "uppercut-down-left",
    "uppercut-down-right",
  ],
  counterAttack: [
    "cross-up-left",
    "cross-up-right",
    "overhand-left",
    "overhand-right",
  ],
};

/**
  @brief The object of boxer defensive animation names (for the upper body)
  @description It contains offensive animation names as keys
  and objects with appropriate defensive animations as values.
*/
export const defensiveAnimationNames = {
  jab: {
    block: ["block-front", "block-up-right"],
    dodge: ["roll-left", "roll-right"],
  },
  "cross-up-left": {
    block: ["block-up-right"],
    dodge: ["slip-right"],
  },
  "cross-up-right": {
    block: ["block-up-left"],
    dodge: ["slip-left"],
  },
  "cross-down-left": {
    block: ["block-down-right"],
    dodge: ["slip-right"],
  },
  "cross-down-right": {
    block: ["block-down-left"],
    dodge: ["slip-left"],
  },
  "hook-up-left": {
    block: ["block-up-right"],
    dodge: ["dive-right", "roll-left", "roll-right"],
  },
  "hook-up-right": {
    block: ["block-up-left"],
    dodge: ["dive-left", "roll-left", "roll-right"],
  },
  "hook-down-left": {
    block: ["block-down-right"],
    dodge: ["roll-left", "roll-right"],
  },
  "hook-down-right": {
    block: ["block-down-left"],
    dodge: ["roll-left", "roll-right"],
  },
  "uppercut-up-left": {
    block: ["block-front", "block-up-right"],
    dodge: ["slip-left", "roll-left", "roll-right"],
  },
  "uppercut-up-right": {
    block: ["block-front", "block-up-left"],
    dodge: ["slip-right", "roll-left", "roll-right"],
  },
  "uppercut-down-left": {
    block: ["block-front", "block-down-right"],
    dodge: ["slip-left"],
  },
  "uppercut-down-right": {
    block: ["block-front", "block-down-left"],
    dodge: ["slip-right"],
  },
  "overhand-left": {
    block: ["block-up-right"],
    dodge: ["slip-right", "roll-left", "roll-right"],
  },
  "overhand-right": {
    block: ["block-up-left"],
    dodge: ["slip-left", "roll-left", "roll-right"],
  },
};

/**
  @brief The object of boxer lower boyd animation names
  @description It contains upper body animation names as keys
  and lower body animations as values.
*/
export const lowerAnimationNames = {
  jab: [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
    "step-backward",
  ],
  "cross-up-left": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
    "step-backward",
  ],
  "cross-up-right": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
    "step-backward",
  ],
  "cross-down-left": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
    "step-backward",
  ],
  "cross-down-right": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
    "step-backward",
  ],
  "hook-up-left": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
    "step-backward",
    "step-to-the-right",
  ],
  "hook-up-right": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
    "step-backward",
    "step-to-the-left",
  ],
  "hook-down-left": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
    "step-backward",
    "step-to-the-right",
  ],
  "hook-down-right": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
    "step-backward",
    "step-to-the-left",
  ],
  "uppercut-up-left": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
  ],
  "uppercut-up-right": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
  ],
  "uppercut-down-left": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
  ],
  "uppercut-down-right": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
  ],
  "overhand-left": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
    "step-to-the-right",
  ],
  "overhand-right": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
    "step-to-the-left",
  ],
  "block-up-left": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
    "step-backward",
    "step-to-the-right",
  ],
  "block-up-right": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
    "step-backward",
    "step-to-the-left",
  ],
  "block-down-left": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
    "step-backward",
    "step-to-the-right",
  ],
  "block-down-right": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
    "step-backward",
    "step-to-the-left",
  ],
  "block-front": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-backward",
  ],
  "slip-left": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
    "step-to-the-left",
  ],
  "slip-right": [
    "fighting-idle-1-lower-body",
    "fighting-idle-2-lower-body",
    "step-forward",
    "step-to-the-right",
  ],
  "roll-left": ["step-backward"],
  "roll-right": ["step-backward"],
  "dive-left": ["step-to-the-left"],
  "dive-right": ["step-to-the-right"],
};

/**
  @brief Special switch leading side animation name
*/
export const switchLeadingSideAnimationName = "switch-leading-side";
