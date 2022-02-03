/** @module containers/Game/services/constants/duelParameters */

/**
  @brief The object of duel economics
  @description It contains
  chanceOfMovementRandomBooster,
  warmupDuration (in seconds),
  duelDuration (in seconds),
  numberOfAttackIntervals,
  intervalDurationRandomBooster,
  chanceOfOffensiveMovement,
  chanceOfDefensiveMovement,
  chanceOfProbeMovement,
  attackIntervalDurationCoefficient,
  probeIntervalDurationCoefficient,
  movementDuration (in seconds),
  attackRestDurationCoefficient,
  probeRestDurationCoefficient,
  reactionTimeCoefficient,
  chanceOfMiss,
  missAngle (in radians),
  bruteForceAttackHealthLoss,
  deceptiveAttackHealthLoss,
  counterAttackHealthLoss,
  bruteForceAttackDefenseBlockSuccessHealthLoss,
  bruteForceAttackDefenseDodgeSuccessHealthLoss,
  bruteForceAttackDefenseFailHealthLoss,
  deceptiveAttackDefenseBlockSuccessHealthLoss,
  deceptiveAttackDefenseDodgeSuccessHealthLoss,
  deceptiveAttackDefenseFailHealthLoss,
  counterAttackDefenseSuccessHealthLoss,
  counterAttackDefenseFailHealthLoss,
  slowMotionCooldownDuration (in seconds),
  slowMotionMovementsNumber,
  slowMotionSpeedMultiplier.
*/
const duelParameters = {
  chanceOfMovementRandomBooster: 0.1,
  warmupDuration: 3.0,
  duelDuration: 60.0,
  numberOfAttackIntervals: 12,
  intervalDurationRandomBooster: 0.1,
  chanceOfOffensiveMovement: 0.4,
  chanceOfDefensiveMovement: 0.4,
  chanceOfProbeMovement: 0.2,
  // chanceOfSwitchLeadingSideMovement = 1.0 - (
  //                                     chanceOfOffensiveMovement +
  //                                     chanceOfDefensiveMovement +
  //                                     chanceOfProbeMovement
  //                                     )
  attackIntervalDurationCoefficient: 4.0,
  probeIntervalDurationCoefficient: 3.0,
  movementDuration: 0.6,
  attackRestDurationCoefficient: 1.0,
  probeRestDurationCoefficient: 3.0,
  reactionTimeCoefficient: 0.35,
  chanceOfMiss: 0.5,
  missAngle: Math.PI / 6.0,
  bruteForceAttackHealthLoss: 0.5,
  deceptiveAttackHealthLoss: 0.0,
  counterAttackHealthLoss: 0.0,
  bruteForceAttackDefenseBlockSuccessHealthLoss: 1.5,
  bruteForceAttackDefenseDodgeSuccessHealthLoss: 0.0,
  bruteForceAttackDefenseFailHealthLoss: 5.0,
  deceptiveAttackDefenseBlockSuccessHealthLoss: 0.5,
  deceptiveAttackDefenseDodgeSuccessHealthLoss: 0.0,
  deceptiveAttackDefenseFailHealthLoss: 10.0,
  counterAttackDefenseSuccessHealthLoss: 1.0,
  counterAttackDefenseFailHealthLoss: 6.0,
  slowMotionCooldownDuration: 3.0,
  slowMotionMovementsNumber: 5,
  slowMotionSpeedMultiplier: 0.3,
};

export default duelParameters;
