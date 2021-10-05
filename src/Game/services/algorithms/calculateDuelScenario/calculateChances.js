import duelEconomics from '../../constants/duelEconomics';
import duelParameters from '../../constants/duelParameters';


export const calculateChancesOfOffensiveMoves = (boxersStats) => {
  let randomMultiplier;
  randomMultiplier = 1.0 + duelParameters.chancesOfMovesRandomBooster * (-1.0 + 2.0 * Math.random());
  const bruteForceAttackCoefficient = (boxersStats.strength * 2.0 + boxersStats.endurance * 1.0) * randomMultiplier;
  randomMultiplier = 1.0 + duelParameters.chancesOfMovesRandomBooster * (-1.0 + 2.0 * Math.random());
  const deceptiveAttackCoefficient = (boxersStats.agility * 2.0 + boxersStats.strength * 1.0) * randomMultiplier;
  randomMultiplier = 1.0 + duelParameters.chancesOfMovesRandomBooster * (-1.0 + 2.0 * Math.random());
  const effectiveAttackCoefficient = (boxersStats.endurance * 2.0 + boxersStats.agility * 1.0) * randomMultiplier;

  const sumOfCoefficients = bruteForceAttackCoefficient + deceptiveAttackCoefficient + effectiveAttackCoefficient;

  return {
    chanceOfBruteForceAttack: bruteForceAttackCoefficient / sumOfCoefficients,
    chanceOfDeceptiveAttack: deceptiveAttackCoefficient / sumOfCoefficients,
    chanceOfEffectiveAttack: effectiveAttackCoefficient / sumOfCoefficients,
  };
};

export const calculateChancesOfDefensiveMoves = (boxersStats) => {
  let randomMultiplier;
  randomMultiplier = 1.0 + duelParameters.chancesOfMovesRandomBooster * (-1.0 + 2.0 * Math.random());
  const blockCoefficient = (boxersStats.endurance * 2.0 + boxersStats.strength * 1.0) * randomMultiplier;
  randomMultiplier = 1.0 + duelParameters.chancesOfMovesRandomBooster * (-1.0 + 2.0 * Math.random());
  const dodgeCoefficient = (boxersStats.agility * 2.0 + boxersStats.endurance * 1.0) * randomMultiplier;
  randomMultiplier = 1.0 + duelParameters.chancesOfMovesRandomBooster * (-1.0 + 2.0 * Math.random());
  const counterAttackCoefficient = (boxersStats.strength * 2.0 + boxersStats.agility * 1.0) * randomMultiplier;

  const sumOfCoefficients = blockCoefficient + dodgeCoefficient + counterAttackCoefficient;

  return {
    chanceOfBlock: blockCoefficient / sumOfCoefficients,
    chanceOfDodge: dodgeCoefficient / sumOfCoefficients,
    chanceOfCounterAttack: counterAttackCoefficient / sumOfCoefficients,
  };
};

export const calculateChancesToWin = (leftBoxersStats, rightBoxersStats) => {
  let randomMultiplier;

  let sumOfLeftBoxersStats = 0.0;
  randomMultiplier = 1.0 + duelEconomics.physiqueRandomBooster * (-1.0 + 2.0 * Math.random());
  sumOfLeftBoxersStats += (leftBoxersStats.strength + leftBoxersStats.agility + leftBoxersStats.endurance) * randomMultiplier;
  sumOfLeftBoxersStats += leftBoxersStats.winrate * duelEconomics.winrateWeight;
  sumOfLeftBoxersStats += leftBoxersStats.rookie * duelEconomics.rookieWeight;
  sumOfLeftBoxersStats += leftBoxersStats.streaming * duelEconomics.streamingWeight;

  let sumOfRightBoxersStats = 0.0;
  randomMultiplier = 1.0 + duelEconomics.physiqueRandomBooster * (-1.0 + 2.0 * Math.random());
  sumOfRightBoxersStats += (rightBoxersStats.strength + rightBoxersStats.agility + rightBoxersStats.endurance) * randomMultiplier;
  sumOfRightBoxersStats += rightBoxersStats.winrate * duelEconomics.winrateWeight;
  sumOfRightBoxersStats += rightBoxersStats.rookie * duelEconomics.rookieWeight;
  sumOfRightBoxersStats += rightBoxersStats.streaming * duelEconomics.streamingWeight;

  const sumOfStats = sumOfLeftBoxersStats + sumOfRightBoxersStats;

  return {
    chanceForLeftBoxerToWin: sumOfLeftBoxersStats / sumOfStats,
    chanceForRightBoxerToWin: sumOfRightBoxersStats / sumOfStats,
  };
};
