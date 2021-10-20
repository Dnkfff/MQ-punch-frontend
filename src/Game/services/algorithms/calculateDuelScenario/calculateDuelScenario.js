import { calculateChancesOfOffensiveMoves, calculateChancesOfDefensiveMoves, calculateChancesToWin } from './calculateChances';
import calculateMoves from './calculateMoves';


const calculateDuelScenario = (leftBoxerStats, rightBoxerStats) => {
  const leftBoxerChancesOfMoves = {
    offensive: calculateChancesOfOffensiveMoves(leftBoxerStats),
    defensive: calculateChancesOfDefensiveMoves(leftBoxerStats),
  };
  const rightBoxerChancesOfMoves = {
    offensive: calculateChancesOfOffensiveMoves(rightBoxerStats),
    defensive: calculateChancesOfDefensiveMoves(rightBoxerStats),
  };
  const { chanceForLeftBoxerToWin, chanceForRightBoxerToWin } = calculateChancesToWin(leftBoxerStats, rightBoxerStats);
  const randomChance = Math.random();
  const winner = randomChance < chanceForLeftBoxerToWin ? 'left' : 'right';

  const duelScenario = calculateMoves(leftBoxerChancesOfMoves, rightBoxerChancesOfMoves, winner);

  return duelScenario;
};

export default calculateDuelScenario;
