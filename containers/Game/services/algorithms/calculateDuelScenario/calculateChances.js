/** @module containers/Game/services/algorithms/calculateDuelScenario/calculateChances */

import duelEconomics from "../../constants/duelEconomics";
import duelParameters from "../../constants/duelParameters";

/**
  @summary Calculates chances of offensive moves based on given boxer stats
  @description Contains random.
  @param boxerStats an object with boxer strength, agility, endurance, rookie, winrate, streaming, leadingSize
  @returns an object with chanceOfBruteForceAttack, chanceOfDeceptiveAttack and chanceOfCounterAttack
*/
export const calculateChancesOfOffensiveMoves = (boxerStats) => {
  let randomMultiplier;
  randomMultiplier =
    1.0 +
    duelParameters.chanceOfMoveRandomBooster * (-1.0 + 2.0 * Math.random());
  const bruteForceAttackCoefficient =
    (boxerStats.strength * 2.0 + boxerStats.endurance * 1.0) * randomMultiplier;
  randomMultiplier =
    1.0 +
    duelParameters.chanceOfMoveRandomBooster * (-1.0 + 2.0 * Math.random());
  const deceptiveAttackCoefficient =
    (boxerStats.endurance * 2.0 + boxerStats.agility * 1.0) * randomMultiplier;
  randomMultiplier =
    1.0 +
    duelParameters.chanceOfMoveRandomBooster * (-1.0 + 2.0 * Math.random());
  const counterAttackCoefficient =
    (boxerStats.agility * 2.0 + boxerStats.strength * 1.0) * randomMultiplier;

  const sumOfCoefficients =
    bruteForceAttackCoefficient +
    deceptiveAttackCoefficient +
    counterAttackCoefficient;

  return {
    chanceOfBruteForceAttack: bruteForceAttackCoefficient / sumOfCoefficients,
    chanceOfDeceptiveAttack: deceptiveAttackCoefficient / sumOfCoefficients,
    chanceOfCounterAttack: counterAttackCoefficient / sumOfCoefficients,
  };
};

/**
  @summary Calculates chances of defensive moves based on given boxer stats
  @description Contains random.
  @param boxerStats an object with boxer strength, agility, endurance, rookie, winrate, streaming, leadingSize
  @returns an object with chanceOfBlock and chanceOfDodge
*/
export const calculateChancesOfDefensiveMoves = (boxerStats) => {
  let randomMultiplier;
  randomMultiplier =
    1.0 +
    duelParameters.chanceOfMoveRandomBooster * (-1.0 + 2.0 * Math.random());
  const blockCoefficient =
    (boxerStats.strength * 3.0 +
      boxerStats.endurance * 2.0 +
      boxerStats.agility * 1.0) *
    randomMultiplier;
  randomMultiplier =
    1.0 +
    duelParameters.chanceOfMoveRandomBooster * (-1.0 + 2.0 * Math.random());
  const dodgeCoefficient =
    (boxerStats.agility * 3.0 +
      boxerStats.endurance * 2.0 +
      boxerStats.strength * 1.0) *
    randomMultiplier;

  const sumOfCoefficients = blockCoefficient + dodgeCoefficient;

  return {
    chanceOfBlock: blockCoefficient / sumOfCoefficients,
    chanceOfDodge: dodgeCoefficient / sumOfCoefficients,
  };
};

/**
  @summary Calculates chances of each boxer to win based on given boxer stats
  @description Contains random.
  @param leftBoxerStats an object with left boxer strength, agility, endurance, rookie, winrate, streaming, leadingSize
  @param leftBoxerStats an object with right boxer strength, agility, endurance, rookie, winrate, streaming, leadingSize
  @returns an object with chanceForLeftBoxerToWin and chanceForRightBoxerToWin
*/
export const calculateChancesToWin = (leftBoxerStats, rightBoxerStats) => {
  let randomMultiplier;

  let sumOfLeftBoxerStats = 0.0;
  randomMultiplier =
    1.0 + duelEconomics.physiqueRandomBooster * (-1.0 + 2.0 * Math.random());
  sumOfLeftBoxerStats +=
    (leftBoxerStats.strength +
      leftBoxerStats.agility +
      leftBoxerStats.endurance) *
    randomMultiplier;
  sumOfLeftBoxerStats += leftBoxerStats.winrate * duelEconomics.winrateWeight;
  sumOfLeftBoxerStats += leftBoxerStats.rookie * duelEconomics.rookieWeight;
  sumOfLeftBoxerStats +=
    leftBoxerStats.streaming * duelEconomics.streamingWeight;

  let sumOfRightBoxerStats = 0.0;
  randomMultiplier =
    1.0 + duelEconomics.physiqueRandomBooster * (-1.0 + 2.0 * Math.random());
  sumOfRightBoxerStats +=
    (rightBoxerStats.strength +
      rightBoxerStats.agility +
      rightBoxerStats.endurance) *
    randomMultiplier;
  sumOfRightBoxerStats += rightBoxerStats.winrate * duelEconomics.winrateWeight;
  sumOfRightBoxerStats += rightBoxerStats.rookie * duelEconomics.rookieWeight;
  sumOfRightBoxerStats +=
    rightBoxerStats.streaming * duelEconomics.streamingWeight;

  const sumOfStats = sumOfLeftBoxerStats + sumOfRightBoxerStats;

  return {
    chanceForLeftBoxerToWin: sumOfLeftBoxerStats / sumOfStats,
    chanceForRightBoxerToWin: sumOfRightBoxerStats / sumOfStats,
  };
};
