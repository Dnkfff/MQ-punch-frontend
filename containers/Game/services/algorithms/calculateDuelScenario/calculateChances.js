/** @module containers/Game/services/algorithms/calculateDuelScenario/calculateChances */

import duelEconomics from "../../constants/duelEconomics";
import duelParameters from "../../constants/duelParameters";

/**
  @summary Calculates chances of offensive movements
  based on given boxer stats and random
  @param boxerStats an object with boxer strength, agility, endurance,
  rookie, winrate and coefficients streaming and leadingSide
  @returns an object with chanceOfBruteForceAttack,
  chanceOfDeceptiveAttack and chanceOfCounterAttack
*/
export const calculateChancesOfOffensiveMovements = (boxerStats) => {
  // random multiplier that is unique for each coefficient
  let randomMultiplier;

  // brute force attack (2 strength, 0 agility, 1 endurance)
  randomMultiplier =
    1.0 +
    duelParameters.chanceOfMovementRandomBooster * (Math.random() * 2.0 - 1.0);
  const bruteForceAttackCoefficient =
    (boxerStats.strength * 2.0 + boxerStats.endurance * 1.0) * randomMultiplier;

  // deceptive attack (0 strength, 1 agility, 2 endurance)
  randomMultiplier =
    1.0 +
    duelParameters.chanceOfMovementRandomBooster * (Math.random() * 2.0 - 1.0);
  const deceptiveAttackCoefficient =
    (boxerStats.endurance * 2.0 + boxerStats.agility * 1.0) * randomMultiplier;

  // counter attack (1 strength, 2 agility, 0 endurance)
  randomMultiplier =
    1.0 +
    duelParameters.chanceOfMovementRandomBooster * (Math.random() * 2.0 - 1.0);
  const counterAttackCoefficient =
    (boxerStats.agility * 2.0 + boxerStats.strength * 1.0) * randomMultiplier;

  // calculating sum of coefficients for further reducing
  const sumOfCoefficients =
    bruteForceAttackCoefficient +
    deceptiveAttackCoefficient +
    counterAttackCoefficient;

  // sum of chances equals one
  const chanceOfBruteForceAttack =
    bruteForceAttackCoefficient / sumOfCoefficients;
  const chanceOfDeceptiveAttack =
    deceptiveAttackCoefficient / sumOfCoefficients;
  const chanceOfCounterAttack = counterAttackCoefficient / sumOfCoefficients;

  return {
    chanceOfBruteForceAttack,
    chanceOfDeceptiveAttack,
    chanceOfCounterAttack,
  };
};

/**
  @summary Calculates chances of defensive movements
  based on given boxer stats and random
  @param boxerStats an object with boxer strength, agility, endurance,
  rookie, winrate and coefficients streaming and leadingSide
  @returns an object with chanceOfBlock and chanceOfDodge
*/
export const calculateChancesOfDefensiveMovements = (boxerStats) => {
  // random multiplier that is unique for each coefficient
  let randomMultiplier;

  // block defense (3 strength, 1 agility, 2 endurance)
  randomMultiplier =
    1.0 +
    duelParameters.chanceOfMovementRandomBooster * (Math.random() * 2.0 - 1.0);
  const blockCoefficient =
    (boxerStats.strength * 3.0 +
      boxerStats.endurance * 2.0 +
      boxerStats.agility * 1.0) *
    randomMultiplier;

  // dodge defense (1 strength, 3 agility, 2 endurance)
  randomMultiplier =
    1.0 +
    duelParameters.chanceOfMovementRandomBooster * (Math.random() * 2.0 - 1.0);
  const dodgeCoefficient =
    (boxerStats.agility * 3.0 +
      boxerStats.endurance * 2.0 +
      boxerStats.strength * 1.0) *
    randomMultiplier;

  // calculating sum of coefficients for further reducing
  const sumOfCoefficients = blockCoefficient + dodgeCoefficient;

  // sum of chances equals one
  const chanceOfBlock = blockCoefficient / sumOfCoefficients;
  const chanceOfDodge = dodgeCoefficient / sumOfCoefficients;

  return {
    chanceOfBlock,
    chanceOfDodge,
  };
};

/**
  @summary Calculates chances of each boxer to win
  based on given boxer stats and random
  @param leftBoxerStats an object with left boxer strength, agility, endurance,
  rookie, winrate and coefficients streaming and leadingSide
  @param rightBoxerStats an object with right boxer strength, agility, endurance,
  rookie, winrate and coefficients streaming and leadingSide
  @returns an object with chanceForLeftBoxerToWin and chanceForRightBoxerToWin
*/
export const calculateChancesToWin = (leftBoxerStats, rightBoxerStats) => {
  // random multiplier that is unique for each boxer
  let randomMultiplier;

  // calculating sum of stats
  let sumOfLeftBoxerStats = 0.0;

  // physique stats
  randomMultiplier =
    1.0 + duelEconomics.physiqueRandomBooster * (Math.random() * 2.0 - 1.0);
  sumOfLeftBoxerStats +=
    (leftBoxerStats.strength +
      leftBoxerStats.agility +
      leftBoxerStats.endurance) *
    randomMultiplier;

  // winning rate
  sumOfLeftBoxerStats += leftBoxerStats.winrate * duelEconomics.winrateWeight;

  // rookie
  sumOfLeftBoxerStats += leftBoxerStats.rookie * duelEconomics.rookieWeight;

  // streaming
  sumOfLeftBoxerStats +=
    leftBoxerStats.streaming * duelEconomics.streamingWeight;

  // calculating sum of stats
  let sumOfRightBoxerStats = 0.0;

  randomMultiplier =
    1.0 + duelEconomics.physiqueRandomBooster * (Math.random() * 2.0 - 1.0);
  sumOfRightBoxerStats +=
    (rightBoxerStats.strength +
      rightBoxerStats.agility +
      rightBoxerStats.endurance) *
    randomMultiplier;
  sumOfRightBoxerStats += rightBoxerStats.winrate * duelEconomics.winrateWeight;
  sumOfRightBoxerStats += rightBoxerStats.rookie * duelEconomics.rookieWeight;
  sumOfRightBoxerStats +=
    rightBoxerStats.streaming * duelEconomics.streamingWeight;

  // calculating sum of both boxers stats for further reducing
  const sumOfStats = sumOfLeftBoxerStats + sumOfRightBoxerStats;

  // sum of chances equals one
  const chanceForLeftBoxerToWin = sumOfLeftBoxerStats / sumOfStats;
  const chanceForRightBoxerToWin = sumOfRightBoxerStats / sumOfStats;

  return {
    chanceForLeftBoxerToWin,
    chanceForRightBoxerToWin,
  };
};
