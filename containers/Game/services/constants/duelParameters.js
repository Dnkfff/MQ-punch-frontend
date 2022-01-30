/** @module containers/Game/services/constants/duelParameters */

/**
  @brief The object of duel economics
  @description It contains
  chanceOfMoveRandomBooster,
  warmupDuration (in seconds),
  duelDuration (in seconds),
  numberOfAttackIntervals,
  intervalDurationRandomBooster,
  chanceOfOffensiveMove,
  chanceOfDefensiveMove,
  chanceOfProbeMove,
  attackIntervalDurationCoefficient,
  probeIntervalDurationCoefficient,
  moveDuration (in seconds),
  attackRestDurationCoefficient,
  probeRestDurationCoefficient,
  reactionTimeCoefficient,
  chanceOfDeceptiveDefenseMove,
  chanceOfMiss,
  slowMotionCooldownDuration (in seconds),
  slowMotionMovesNumber,
  slowMotionSpeedMultiplier.
*/
const duelParameters = {
  chanceOfMoveRandomBooster: 0.1,
  warmupDuration: 3.0,
  duelDuration: 60.0,
  numberOfAttackIntervals: 12,
  intervalDurationRandomBooster: 0.1,
  chanceOfOffensiveMove: 0.4,
  chanceOfDefensiveMove: 0.4,
  chanceOfProbeMove: 0.15,
  attackIntervalDurationCoefficient: 4.0,
  probeIntervalDurationCoefficient: 3.0,
  moveDuration: 0.6,
  attackRestDurationCoefficient: 1.0,
  probeRestDurationCoefficient: 3.0,
  reactionTimeCoefficient: 0.35,
  chanceOfDeceptiveDefenseMove: 0.9,
  chanceOfMiss: 0.05,
  slowMotionCooldownDuration: 3.0,
  slowMotionMovesNumber: 5,
  slowMotionSpeedMultiplier: 0.3,
};

export default duelParameters;
