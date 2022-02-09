/** @module containers/Game/services/constants/duelParameters */

/**
  @brief The object of duel economics
  @description It contains
  chanceOfMovementRandomBooster,
  duelDuration (in seconds),
  numberOfAttackIntervals,
  intervalDurationRandomBooster,
  chanceOfOffensiveMovement (chanceOfOffensiveMovement + chanceOfDefensiveMovement = 1.0),
  chanceOfDefensiveMovement (chanceOfOffensiveMovement + chanceOfDefensiveMovement = 1.0),
  chanceOfProbeMovement (chanceOfProbeMovement + chanceOfSwitchLeadingSideMovement = 1.0),
  chanceOfSwitchLeadingSideMovement (chanceOfProbeMovement + chanceOfSwitchLeadingSideMovement = 1.0),
  attackIntervalDurationCoefficient,
  probeIntervalDurationCoefficient,
  movementDuration (in seconds),
  attackRestDurationCoefficient,
  probeRestDurationCoefficient,
  reactionTimeCoefficient,
  chanceOfMiss,
  bruteForceAttackConcentrationLoss,
  deceptiveAttackConcentrationLoss,
  bruteForceAttackDefenseBlockSuccessConcentrationLoss,
  bruteForceAttackDefenseDodgeSuccessConcentrationLoss,
  bruteForceAttackDefenseFailConcentrationLoss,
  deceptiveAttackDefenseBlockSuccessConcentrationLoss,
  deceptiveAttackDefenseDodgeSuccessConcentrationLoss,
  deceptiveAttackDefenseFailConcentrationLoss.
*/
const duelParameters = {
  chanceOfMovementRandomBooster: 0.1,
  duelDuration: 60.0,
  numberOfAttackIntervals: 12,
  intervalDurationRandomBooster: 0.1,
  chanceOfOffensiveMovement: 0.5,
  chanceOfDefensiveMovement: 0.5,
  chanceOfProbeMovement: 1.0,
  chanceOfSwitchLeadingSideMovement: 0.0,
  attackIntervalDurationCoefficient: 4.0,
  probeIntervalDurationCoefficient: 3.0,
  movementDuration: 0.6,
  attackRestDurationCoefficient: 1.0,
  probeRestDurationCoefficient: 3.0,
  reactionTimeCoefficient: 0.35,
  chanceOfMiss: 0.5,
  bruteForceAttackConcentrationLoss: 0.5,
  deceptiveAttackConcentrationLoss: 0.0,
  bruteForceAttackDefenseBlockSuccessConcentrationLoss: 1.5,
  bruteForceAttackDefenseDodgeSuccessConcentrationLoss: 0.0,
  bruteForceAttackDefenseFailConcentrationLoss: 5.0,
  deceptiveAttackDefenseBlockSuccessConcentrationLoss: 0.5,
  deceptiveAttackDefenseDodgeSuccessConcentrationLoss: 0.0,
  deceptiveAttackDefenseFailConcentrationLoss: 10.0,
};

export default duelParameters;
