import { calculateChancesOfOffensiveMoves, calculateChancesOfDefensiveMoves, calculateChancesToWin } from './calculateChances';
import calculateMoves from './calculateMoves';


const calculateDuelScenario = (leftBoxersStats, rightBoxersStats) => {
  const leftBoxersChancesOfMoves = {
    offensive: calculateChancesOfOffensiveMoves(leftBoxersStats),
    defensive: calculateChancesOfDefensiveMoves(leftBoxersStats),
  };
  const rightBoxersChancesOfMoves = {
    offensive: calculateChancesOfOffensiveMoves(rightBoxersStats),
    defensive: calculateChancesOfDefensiveMoves(rightBoxersStats),
  };
  const { chanceForLeftBoxerToWin, chanceForRightBoxerToWin } = calculateChancesToWin(leftBoxersStats, rightBoxersStats);
  const randomChance = Math.random();
  const winner = randomChance < chanceForLeftBoxerToWin ? 'left' : 'right';

  const duelScenario = calculateMoves(leftBoxersChancesOfMoves, rightBoxersChancesOfMoves, winner);

  return duelScenario;
};

export default calculateDuelScenario;
