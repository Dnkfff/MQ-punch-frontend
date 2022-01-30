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
  chanceOfDeceptiveDefenseMovement,
  chanceOfMiss,
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
  chanceOfProbeMovement: 0.15,
  attackIntervalDurationCoefficient: 4.0,
  probeIntervalDurationCoefficient: 3.0,
  movementDuration: 0.6,
  attackRestDurationCoefficient: 1.0,
  probeRestDurationCoefficient: 3.0,
  reactionTimeCoefficient: 0.35,
  chanceOfDeceptiveDefenseMovement: 0.9,
  chanceOfMiss: 0.05,
  slowMotionCooldownDuration: 3.0,
  slowMotionMovementsNumber: 5,
  slowMotionSpeedMultiplier: 0.3,
};

export default duelParameters;
