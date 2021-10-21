export const probeAnimationNames = [
  'jab',
  'slip-left',
  'roll-left',
  'dive-left',
  'slip-right',
  'roll-right',
  'dive-right',
];

export const offensiveAnimationNames = {
  bruteForceAttack: [
    'cross-up-left',
    'cross-up-right',
    'cross-down-left',
    'cross-down-right',
    'hook-up-left',
    'hook-up-right',
    'hook-down-left',
    'hook-down-right',
    'uppercut-up-left',
    'uppercut-up-right',
    'uppercut-down-left',
    'uppercut-down-right',
    'overhand-left',
    'overhand-right',
  ],
  deceptiveAttack: [
    'jab',
    'cross-up-left',
    'cross-up-right',
    'cross-down-left',
    'cross-down-right',
    'hook-up-left',
    'hook-up-right',
    'hook-down-left',
    'hook-down-right',
    'uppercut-up-left',
    'uppercut-up-right',
    'uppercut-down-left',
    'uppercut-down-right',
  ],
  counterAttack: [
    'cross-up-left',
    'cross-up-right',
    'overhand-left',
    'overhand-right',
  ],
};

export const defensiveAnimationNames = {
  'jab': {
    block: [
      'block-front',
      'block-up-right',
    ],
    dodge: [
      'roll-left',
      'roll-right',
    ],
  },
  'cross-up-left': {
    block: [
      'block-up-right',
    ],
    dodge: [
      'slip-right',
    ],
  },
  'cross-up-right': {
    block: [
      'block-up-left',
    ],
    dodge: [
      'slip-left',
    ],
  },
  'cross-down-left': {
    block: [
      'block-down-right',
    ],
    dodge: [
      'slip-right',
    ],
  },
  'cross-down-right': {
    block: [
      'block-down-left',
    ],
    dodge: [
      'slip-left',
    ],
  },
  'hook-up-left': {
    block: [
      'block-up-right',
    ],
    dodge: [
      'dive-right',
      'roll-left',
      'roll-right',
    ],
  },
  'hook-up-right': {
    block: [
      'block-up-left',
    ],
    dodge: [
      'dive-left',
      'roll-left',
      'roll-right',
    ],
  },
  'hook-down-left': {
    block: [
      'block-down-right',
    ],
    dodge: [
      'roll-left',
      'roll-right',
    ],
  },
  'hook-down-right': {
    block: [
      'block-down-left',
    ],
    dodge: [
      'roll-left',
      'roll-right',
    ],
  },
  'uppercut-up-left': {
    block: [
      'block-front',
      'block-up-right',
    ],
    dodge: [
      'slip-left',
      'roll-left',
      'roll-right',
    ],
  },
  'uppercut-up-right': {
    block: [
      'block-front',
      'block-up-left',
    ],
    dodge: [
      'slip-right',
      'roll-left',
      'roll-right',
    ],
  },
  'uppercut-down-left': {
    block: [
      'block-front',
      'block-down-right',
    ],
    dodge: [
      'slip-left',
    ],
  },
  'uppercut-down-right': {
    block: [
      'block-front',
      'block-down-left',
    ],
    dodge: [
      'slip-right',
    ],
  },
  'overhand-left': {
    block: [
      'block-up-right',
    ],
    dodge: [
      'slip-right',
      'roll-left',
      'roll-right',
    ],
  },
  'overhand-right': {
    block: [
      'block-up-left',
    ],
    dodge: [
      'slip-left',
      'roll-left',
      'roll-right',
    ],
  },
};

export const lowerAnimationNames = {
  'jab': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
    'step-forward',
    'step-backward',
  ],
  'cross-up-left': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
    'step-forward',
    'step-backward',
  ],
  'cross-up-right': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
    'step-forward',
    'step-backward',
  ],
  'cross-down-left': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
    'step-forward',
    'step-backward',
  ],
  'cross-down-right': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
    'step-forward',
    'step-backward',
  ],
  'hook-up-left': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
    'step-forward',
    'step-backward',
    'step-to-the-right',
  ],
  'hook-up-right': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
    'step-forward',
    'step-backward',
    'step-to-the-left',
  ],
  'hook-down-left': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
    'step-forward',
    'step-backward',
    'step-to-the-right',
  ],
  'hook-down-right': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
    'step-forward',
    'step-backward',
    'step-to-the-left',
  ],
  'uppercut-up-left': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
  ],
  'uppercut-up-right': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
  ],
  'uppercut-down-left': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
  ],
  'uppercut-down-right': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
  ],
  'overhand-left': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
    'step-forward',
    'step-to-the-right',
  ],
  'overhand-right': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
    'step-forward',
    'step-to-the-left',
  ],
  'block-up-left': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
    'step-backward',
    'step-to-the-right',
  ],
  'block-up-right': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
    'step-backward',
    'step-to-the-left',
  ],
  'block-down-left': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
    'step-backward',
    'step-to-the-right',
  ],
  'block-down-right': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
    'step-backward',
    'step-to-the-left',
  ],
  'block-front': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
    'step-backward',
  ],
  'slip-left': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
    'step-forward',
    'step-to-the-left',
  ],
  'slip-right': [
    'fighting-idle-1-lower-body',
    'fighting-idle-2-lower-body',
    'step-forward',
    'step-to-the-right',
  ],
  'roll-left': [
    'step-backward',
  ],
  'roll-right': [
    'step-backward',
  ],
  'dive-left': [
    'step-to-the-left',
  ],
  'dive-right': [
    'step-to-the-right',
  ],
};

export const switchLeadingSideAnimationName = 'switch-leading-side';
