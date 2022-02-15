/** @module containers/Game/services/algorithms/calculateDuelScenario/calculateChances */

import duelEconomics from '../../constants/duelEconomics';
import duelParameters from '../../constants/duelParameters';

/**
  @summary Calculates chances of offensive movements
  based on given boxer stats and random
  @param boxerStats an object with boxer strength, agility, endurance,
  rookie, winrate and coefficients streaming and leadingSide
  @returns an object with chance of brute force and chance of deceptive attack
*/
export const calculateChancesOfOffensiveMovements = (boxerStats) => {
  // random multiplier that is unique for each coefficient
  let randomMultiplier;

  // brute force attack (3 strength, 1 agility, 2 endurance)
  randomMultiplier =
    1.0 + duelParameters.chanceOfMovementRandomBooster * (Math.random() * 2.0 - 1.0);
  const bruteForceCoefficient =
    (boxerStats.strength * 3.0 + boxerStats.endurance * 2.0 + boxerStats.agility * 1.0) *
    randomMultiplier;

  // deceptive attack (1 strength, 3 agility, 2 endurance)
  randomMultiplier =
    1.0 + duelParameters.chanceOfMovementRandomBooster * (Math.random() * 2.0 - 1.0);
  const deceptiveCoefficient =
    (boxerStats.agility * 3.0 + boxerStats.endurance * 2.0 + boxerStats.strength * 1.0) *
    randomMultiplier;

  // calculating sum of coefficients for further reducing
  const sumOfCoefficients = bruteForceCoefficient + deceptiveCoefficient;

  // sum of chances equals one
  const chanceOfBruteForce = bruteForceCoefficient / sumOfCoefficients;
  const chanceOfDeceptive = deceptiveCoefficient / sumOfCoefficients;

  return {
    bruteForce: chanceOfBruteForce,
    deceptive: chanceOfDeceptive,
  };
};

/**
  @summary Calculates chances of defensive movements
  based on given boxer stats and random
  @param boxerStats an object with boxer strength, agility, endurance,
  rookie, winrate and coefficients streaming and leadingSide
  @returns an object with chance of block and chance of dodge defense
*/
export const calculateChancesOfDefensiveMovements = (boxerStats) => {
  // random multiplier that is unique for each coefficient
  let randomMultiplier;

  // block defense (3 strength, 1 agility, 2 endurance)
  randomMultiplier =
    1.0 + duelParameters.chanceOfMovementRandomBooster * (Math.random() * 2.0 - 1.0);
  const blockCoefficient =
    (boxerStats.strength * 3.0 + boxerStats.endurance * 2.0 + boxerStats.agility * 1.0) *
    randomMultiplier;

  // dodge defense (1 strength, 3 agility, 2 endurance)
  randomMultiplier =
    1.0 + duelParameters.chanceOfMovementRandomBooster * (Math.random() * 2.0 - 1.0);
  const dodgeCoefficient =
    (boxerStats.agility * 3.0 + boxerStats.endurance * 2.0 + boxerStats.strength * 1.0) *
    randomMultiplier;

  // calculating sum of coefficients for further reducing
  const sumOfCoefficients = blockCoefficient + dodgeCoefficient;

  // sum of chances equals one
  const chanceOfBlock = blockCoefficient / sumOfCoefficients;
  const chanceOfDodge = dodgeCoefficient / sumOfCoefficients;

  return {
    block: chanceOfBlock,
    dodge: chanceOfDodge,
  };
};

/**
  @summary Calculates chances of each boxer to win
  based on given boxer stats and random
  @param leftBoxerStats an object with left boxer strength, agility, endurance,
  rookie, winrate and coefficients streaming and leadingSide
  @param rightBoxerStats an object with right boxer strength, agility, endurance,
  rookie, winrate and coefficients streaming and leadingSide
  @returns an object with chance for left boxer to win and chance for right boxer to win
*/
export const calculateChancesToWin = (leftBoxerStats, rightBoxerStats) => {
  // random multiplier that is unique for each boxer
  let randomMultiplier;

  // calculating sum of stats
  let sumOfLeftBoxerStats = 0.0;

  // physique stats
  randomMultiplier = 1.0 + duelEconomics.physiqueRandomBooster * (Math.random() * 2.0 - 1.0);
  sumOfLeftBoxerStats +=
    (leftBoxerStats.strength + leftBoxerStats.agility + leftBoxerStats.endurance) *
    randomMultiplier;

  // winning rate
  sumOfLeftBoxerStats += leftBoxerStats.winrate * duelEconomics.winrateWeight;

  // rookie
  sumOfLeftBoxerStats += leftBoxerStats.rookie * duelEconomics.rookieWeight;

  // streaming
  sumOfLeftBoxerStats += leftBoxerStats.streaming * duelEconomics.streamingWeight;

  // calculating sum of stats
  let sumOfRightBoxerStats = 0.0;

  randomMultiplier = 1.0 + duelEconomics.physiqueRandomBooster * (Math.random() * 2.0 - 1.0);
  sumOfRightBoxerStats +=
    (rightBoxerStats.strength + rightBoxerStats.agility + rightBoxerStats.endurance) *
    randomMultiplier;
  sumOfRightBoxerStats += rightBoxerStats.winrate * duelEconomics.winrateWeight;
  sumOfRightBoxerStats += rightBoxerStats.rookie * duelEconomics.rookieWeight;
  sumOfRightBoxerStats += rightBoxerStats.streaming * duelEconomics.streamingWeight;

  // calculating sum of both boxers stats for further reducing
  const sumOfStats = sumOfLeftBoxerStats + sumOfRightBoxerStats;

  // sum of chances equals one
  const chanceForLeftBoxerToWin = sumOfLeftBoxerStats / sumOfStats;
  const chanceForRightBoxerToWin = sumOfRightBoxerStats / sumOfStats;

  return {
    left: chanceForLeftBoxerToWin,
    right: chanceForRightBoxerToWin,
  };
};
