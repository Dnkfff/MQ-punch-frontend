import calculateWinnerMoveTimings from './calculateWinnerMoveTimings';

import duelParameters from '../../constants/duelParameters';
import duelAnimationNames from '../../constants/duelAnimationNames';


const pushProbeMove = (moveTiming, moves) => {
  let randomChance, randomIndex, randomMultiplier;
  let lowerBodyMove, upperBodyMove;

  randomIndex = Math.floor(Math.random() * duelAnimationNames.lower.length);
  lowerBodyMove = duelAnimationNames.lower[randomIndex];
  randomIndex = Math.floor(Math.random() * duelAnimationNames.upper.probe.length);
  upperBodyMove = duelAnimationNames.upper.probe[randomIndex];

  randomChance = Math.random();
  if (randomChance < duelParameters.chanceOfMove) {
    randomMultiplier = Math.random();
    const reactionTime = duelParameters.reactionTimeCoefficient * duelParameters.moveDuration * randomMultiplier;
    moves.push({
      startTime: moveTiming.startTime + reactionTime,
      move: {
        lower: lowerBodyMove,
        upper: upperBodyMove,
      },
    });
  }
};

const pushOffensiveMove = (moveTiming, moves, chancesOfMoves) => {
  let randomChance, randomIndex, randomMultiplier;
  let lowerBodyMove, upperBodyMove;

  randomChance = Math.random();
  if (randomChance < chancesOfMoves.offensive.chanceOfBruteForceAttack) {
    randomIndex = Math.floor(Math.random() * duelAnimationNames.lower.length);
    lowerBodyMove = duelAnimationNames.lower[randomIndex];
    randomIndex = Math.floor(Math.random() * duelAnimationNames.upper.offensive.bruteForceAttack.length);
    upperBodyMove = duelAnimationNames.upper.offensive.bruteForceAttack[randomIndex];
  } else if (randomChance < chancesOfMoves.offensive.chanceOfBruteForceAttack + chancesOfMoves.offensive.chanceOfDeceptiveAttack) {
    randomIndex = Math.floor(Math.random() * duelAnimationNames.lower.length);
    lowerBodyMove = duelAnimationNames.lower[randomIndex];
    randomIndex = Math.floor(Math.random() * duelAnimationNames.upper.offensive.deceptiveAttack.length);
    upperBodyMove = duelAnimationNames.upper.offensive.deceptiveAttack[randomIndex];
  } else {
    randomIndex = Math.floor(Math.random() * duelAnimationNames.lower.length);
    lowerBodyMove = duelAnimationNames.lower[randomIndex];
    randomIndex = Math.floor(Math.random() * duelAnimationNames.upper.offensive.counterAttack.length);
    upperBodyMove = duelAnimationNames.upper.offensive.counterAttack[randomIndex];
  }

  randomChance = Math.random();
  if (randomChance < duelParameters.chanceOfMove) {
    randomMultiplier = Math.random();
    const reactionTime = duelParameters.reactionTimeCoefficient * duelParameters.moveDuration * randomMultiplier;
    moves.push({
      startTime: moveTiming.startTime + reactionTime,
      move: {
        lower: lowerBodyMove,
        upper: upperBodyMove,
      },
    });
  }
};

const pushDefensiveMove = (moveTiming, moves, chancesOfMoves) => {
  let randomChance, randomIndex, randomMultiplier;
  let lowerBodyMove, upperBodyMove;

  randomChance = Math.random();
  if (randomChance < chancesOfMoves.defensive.chanceOfBlock) {
    randomIndex = Math.floor(Math.random() * duelAnimationNames.lower.length);
    lowerBodyMove = duelAnimationNames.lower[randomIndex];
    randomIndex = Math.floor(Math.random() * duelAnimationNames.upper.defensive.block.length);
    upperBodyMove = duelAnimationNames.upper.defensive.block[randomIndex];
  } else {
    randomIndex = Math.floor(Math.random() * duelAnimationNames.lower.length);
    lowerBodyMove = duelAnimationNames.lower[randomIndex];
    randomIndex = Math.floor(Math.random() * duelAnimationNames.upper.defensive.dodge.length);
    upperBodyMove = duelAnimationNames.upper.defensive.dodge[randomIndex];
  }

  randomChance = Math.random();
  if (randomChance < duelParameters.chanceOfMove) {
    randomMultiplier = Math.random();
    const reactionTime = duelParameters.reactionTimeCoefficient * duelParameters.moveDuration * randomMultiplier;
    moves.push({
      startTime: moveTiming.startTime + reactionTime,
      move: {
        lower: lowerBodyMove,
        upper: upperBodyMove,
      },
    });
  }
};

const calculateMoves = (leftBoxerChancesOfMoves, rightBoxerChancesOfMoves, winner) => {
  let winnerMoves = [], loserMoves = [];

  const winnerMoveTimings = calculateWinnerMoveTimings();

  winnerMoveTimings.forEach((winnerMoveTiming) => {
    if (winnerMoveTiming.type === 'probe') {
      pushProbeMove(winnerMoveTiming, winnerMoves);
      pushProbeMove(winnerMoveTiming, loserMoves);
    } else if (winnerMoveTiming.type === 'attack') {
      if (winner === 'left') {
        pushOffensiveMove(winnerMoveTiming, winnerMoves, leftBoxerChancesOfMoves);
        pushDefensiveMove(winnerMoveTiming, loserMoves, rightBoxerChancesOfMoves);
      } else {
        pushOffensiveMove(winnerMoveTiming, winnerMoves, rightBoxerChancesOfMoves);
        pushDefensiveMove(winnerMoveTiming, loserMoves, leftBoxerChancesOfMoves);
      }
    } else {
      if (winner === 'left') {
        pushOffensiveMove(winnerMoveTiming, loserMoves, rightBoxerChancesOfMoves);
        pushDefensiveMove(winnerMoveTiming, winnerMoves, leftBoxerChancesOfMoves);
      } else {
        pushOffensiveMove(winnerMoveTiming, loserMoves, leftBoxerChancesOfMoves);
        pushDefensiveMove(winnerMoveTiming, winnerMoves, rightBoxerChancesOfMoves);
      }
    }
  });

  return {
    leftBoxerMoves: winner === 'left' ? winnerMoves : loserMoves,
    rightBoxerMoves: winner === 'left' ? loserMoves : winnerMoves,
  };
};

export default calculateMoves;
