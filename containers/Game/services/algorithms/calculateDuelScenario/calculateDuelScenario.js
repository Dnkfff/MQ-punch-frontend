/** @module containers/Game/services/algorithms/calculateDuelScenario/calculateDuelScenario */

import {
  calculateChancesOfOffensiveMovements,
  calculateChancesOfDefensiveMovements,
  calculateChancesToWin,
} from "./calculateChances";
import calculateMovements from "./calculateMovements";

/**
  @summary Calculates the duel scenario asynchronously
  @param leftBoxerStats an object with left boxer strength, agility, endurance, rookie, winrate, streaming, leadingSize
  @param rightBoxerStats an object with right boxer strength, agility, endurance, rookie, winrate, streaming, leadingSize
  @returns the duel scenario
*/
const calculateDuelScenario = (leftBoxerStats, rightBoxerStats) => {
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
  const { chanceForLeftBoxerToWin, chanceForRightBoxerToWin } =
    calculateChancesToWin(leftBoxerStats, rightBoxerStats);
  const randomChance = Math.random();
  const winner = randomChance < chanceForLeftBoxerToWin ? "left" : "right";

  const boxersLeadingSides = {
    leftBoxerLeadingSide: leftBoxerStats.leadingSide,
    rightBoxerLeadingSide: rightBoxerStats.leadingSide,
  };

  const duelScenario = calculateMovements(
    boxersChancesOfMovements,
    boxersLeadingSides,
    winner
  );

  return duelScenario;
};

export default calculateDuelScenario;
