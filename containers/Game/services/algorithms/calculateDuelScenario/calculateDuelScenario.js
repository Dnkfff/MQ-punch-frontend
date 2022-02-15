/** @module containers/Game/services/algorithms/calculateDuelScenario/calculateDuelScenario */

import duelParameters from '../../constants/duelParameters';
import {
  calculateChancesOfOffensiveMovements,
  calculateChancesOfDefensiveMovements,
  calculateChancesToWin,
} from './calculateChances';
import calculateMovements from './calculateMovements';

/**
  @summary Calculates the duel scenario
  @param leftBoxerStats an object with left boxer strength, agility, endurance,
  rookie, winrate and coefficients streaming and leadingSide
  @param rightBoxerStats an object with right boxer strength, agility, endurance,
  rookie, winrate and coefficients streaming and leadingSide
  @returns the duel scenario with moves for each boxer
*/
const calculateDuelScenario = (leftBoxerStats, rightBoxerStats) => {
  // calculating chances of each move for each boxer
  const boxersChancesOfMovements = {
    leftBoxerChancesOfMovements: {
      offensive: calculateChancesOfOffensiveMovements(leftBoxerStats),
      defensive: calculateChancesOfDefensiveMovements(leftBoxerStats),
    },
    rightBoxerChancesOfMovements: {
      offensive: calculateChancesOfOffensiveMovements(rightBoxerStats),
      defensive: calculateChancesOfDefensiveMovements(rightBoxerStats),
    },
  };

  // calculating chances of each boxer to win
  const { left: chanceForLeftBoxerToWin } = calculateChancesToWin(leftBoxerStats, rightBoxerStats);

  // choosing the winner
  const winner = Math.random() < chanceForLeftBoxerToWin ? 'left' : 'right';

  // packing leading sides of each boxer to an object
  const boxersLeadingSides = {
    leftBoxerLeadingSide: leftBoxerStats.leadingSide,
    rightBoxerLeadingSide: rightBoxerStats.leadingSide,
  };

  // calculating movements for each boxer
  // so they will be stored in one object
  const duelScenario = calculateMovements(boxersChancesOfMovements, boxersLeadingSides, winner);

  return duelScenario;
};

export default calculateDuelScenario;
