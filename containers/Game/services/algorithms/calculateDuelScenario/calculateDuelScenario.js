/** @module containers/Game/services/algorithms/calculateDuelScenario/calculateDuelScenario */

import {
  calculateChancesOfOffensiveMoves,
  calculateChancesOfDefensiveMoves,
  calculateChancesToWin,
} from "./calculateChances";
import calculateMoves from "./calculateMoves";

/**
  @summary Calculates the duel scenario
  @description Works asynchronously.
  @param leftBoxerStats an object with left boxer strength, agility, endurance, rookie, winrate, streaming, leadingSize
  @param rightBoxerStats an object with right boxer strength, agility, endurance, rookie, winrate, streaming, leadingSize
  @returns the duel scenario
*/
const calculateDuelScenario = (leftBoxerStats, rightBoxerStats) => {
  const boxersChancesOfMoves = {
    leftBoxerChancesOfMoves: {
      offensive: calculateChancesOfOffensiveMoves(leftBoxerStats),
      defensive: calculateChancesOfDefensiveMoves(leftBoxerStats),
    },
    rightBoxerChancesOfMoves: {
      offensive: calculateChancesOfOffensiveMoves(rightBoxerStats),
      defensive: calculateChancesOfDefensiveMoves(rightBoxerStats),
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

  const duelScenario = calculateMoves(
    boxersChancesOfMoves,
    boxersLeadingSides,
    winner
  );

  return duelScenario;
};

export default calculateDuelScenario;
