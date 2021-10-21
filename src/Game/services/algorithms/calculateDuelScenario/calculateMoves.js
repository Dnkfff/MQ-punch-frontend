import calculateMoveTimings from './calculateMoveTimings';

import duelParameters from '../../constants/duelParameters';
import {
  probeAnimationNames,
  offensiveAnimationNames,
  defensiveAnimationNames,
  lowerAnimationNames,
  switchLeadingSideAnimationName
} from '../../constants/duelAnimationNames';


const pushTheMove = (move, moveTimingStartTime, moves) => {
  const randomChance = Math.random();
  if (randomChance < duelParameters.chanceOfMove) {
    const randomMultiplier = Math.random();
    const reactionTime = duelParameters.reactionTimeCoefficient * duelParameters.moveDuration * randomMultiplier;
    moves.push({
      startTime: moveTimingStartTime + reactionTime,
      move: move,
    });
  }
};

const applyLeadingSide = (upperBodyMoveName, leadingSide) => {
  if (leadingSide === 'left') {
    if (upperBodyMoveName.includes('left')) {
      upperBodyMoveName.replace('left', 'right');
    } else {
      upperBodyMoveName.replace('right', 'left');
    }
  }
};

const pushProbeMove = (moveTimingStartTime, moves, leadingSide) => {
  let randomIndex;
  let lowerBodyMoveName, upperBodyMoveName;

  randomIndex = Math.floor(Math.random() * probeAnimationNames.length);
  upperBodyMoveName = probeAnimationNames[randomIndex];
  applyLeadingSide(upperBodyMoveName, leadingSide);

  randomIndex = Math.floor(Math.random() * lowerAnimationNames[upperBodyMoveName].length);
  lowerBodyMoveName = lowerAnimationNames[upperBodyMoveName][randomIndex];

  const move = {
    lower: lowerBodyMoveName,
    upper: upperBodyMoveName,
  };
  pushTheMove(move, moveTimingStartTime, moves);
};

const pushOffensiveMove = (moveTimingStartTime, moves, leadingSide, chancesOfMoves) => {
  let randomIndex;
  let lowerBodyMoveName, upperBodyMoveName;

  const randomChance = Math.random();
  if (randomChance < chancesOfMoves.offensive.chanceOfBruteForceAttack) {
    randomIndex = Math.floor(Math.random() * offensiveAnimationNames.bruteForceAttack.length);
    upperBodyMoveName = offensiveAnimationNames.bruteForceAttack[randomIndex];
  } else if (randomChance < chancesOfMoves.offensive.chanceOfBruteForceAttack + chancesOfMoves.offensive.chanceOfDeceptiveAttack) {
    randomIndex = Math.floor(Math.random() * offensiveAnimationNames.deceptiveAttack.length);
    upperBodyMoveName = offensiveAnimationNames.deceptiveAttack[randomIndex];
  } else {
    randomIndex = Math.floor(Math.random() * offensiveAnimationNames.counterAttack.length);
    upperBodyMoveName = offensiveAnimationNames.counterAttack[randomIndex];
  }
  applyLeadingSide(upperBodyMoveName, leadingSide);

  randomIndex = Math.floor(Math.random() * lowerAnimationNames[upperBodyMoveName].length);
  lowerBodyMoveName = lowerAnimationNames[upperBodyMoveName][randomIndex];

  const move = {
    lower: lowerBodyMoveName,
    upper: upperBodyMoveName,
  };
  pushTheMove(move, moveTimingStartTime, moves);

  return move;
};

const pushDefensiveMove = (moveTimingStartTime, moves, leadingSide, chancesOfMoves, offensiveMoveName) => {
  let randomIndex;
  let lowerBodyMoveName, upperBodyMoveName;

  const randomChance = Math.random();
  if (randomChance < chancesOfMoves.defensive.chanceOfBlock) {
    randomIndex = Math.floor(Math.random() * defensiveAnimationNames[offensiveMoveName].block.length);
    upperBodyMoveName = defensiveAnimationNames[offensiveMoveName].block[randomIndex];
  } else {
    randomIndex = Math.floor(Math.random() * defensiveAnimationNames[offensiveMoveName].dodge.length);
    upperBodyMoveName = defensiveAnimationNames[offensiveMoveName].dodge[randomIndex];
  }
  applyLeadingSide(upperBodyMoveName, leadingSide);

  randomIndex = Math.floor(Math.random() * lowerAnimationNames[upperBodyMoveName].length);
  lowerBodyMoveName = lowerAnimationNames[upperBodyMoveName][randomIndex];

  const move = {
    lower: lowerBodyMoveName,
    upper: upperBodyMoveName,
  };
  pushTheMove(move, moveTimingStartTime, moves);
};

const pushSwitchLeadingSideMove = (moveTimingStartTime, moves) => {
  const move = {
    whole: switchLeadingSideAnimationName,
  };
  pushTheMove(move, moveTimingStartTime, moves);
};

const calculateMoves = (boxersChancesOfMoves, boxersLeadingSides, winner) => {
  const { leftBoxerChancesOfMoves, rightBoxerChancesOfMoves } = boxersChancesOfMoves;
  const { leftBoxerLeadingSide, rightBoxerLeadingSide } = boxersLeadingSides;

  let winnerMoves = [], loserMoves = [];

  const moveTimings = calculateMoveTimings(leftBoxerLeadingSide, rightBoxerLeadingSide, winner);

  moveTimings.forEach((moveTiming) => {
    if (moveTiming.winnerMoveType === 'probe') {
      pushProbeMove(moveTiming.startTime, winnerMoves);
      pushProbeMove(moveTiming.startTime, loserMoves);
    } else if (moveTiming.winnerMoveType === 'offensive') {
      if (winner === 'left') {
        const offensiveMove = pushOffensiveMove(moveTiming.startTime, winnerMoves, moveTiming.winnerLeadingSide, leftBoxerChancesOfMoves);
        pushDefensiveMove(moveTiming.startTime, loserMoves, moveTiming.loserLeadingSide, rightBoxerChancesOfMoves, offensiveMove.upper);
      } else {
        const offensiveMove = pushOffensiveMove(moveTiming.startTime, winnerMoves, moveTiming.winnerLeadingSide, rightBoxerChancesOfMoves);
        pushDefensiveMove(moveTiming.startTime, loserMoves, moveTiming.loserLeadingSide, leftBoxerChancesOfMoves, offensiveMove.upper);
      }
    } else if (moveTiming.winnerMoveType === 'defensive') {
      if (winner === 'left') {
        const offensiveMove = pushOffensiveMove(moveTiming.startTime, loserMoves, moveTiming.loserLeadingSide, rightBoxerChancesOfMoves);
        pushDefensiveMove(moveTiming.startTime, winnerMoves, moveTiming.winnerLeadingSide, leftBoxerChancesOfMoves, offensiveMove.upper);
      } else {
        const offensiveMove = pushOffensiveMove(moveTiming.startTime, loserMoves, moveTiming.loserLeadingSide, leftBoxerChancesOfMoves);
        pushDefensiveMove(moveTiming.startTime, winnerMoves, moveTiming.winnerLeadingSide, rightBoxerChancesOfMoves, offensiveMove.upper);
      }
    } else {
      if (moveTiming.winnerMoveType === 'switchLeadingSide-winner') {
        pushSwitchLeadingSideMove(moveTiming.startTime, winnerMoves);
        pushProbeMove(moveTiming.startTime, loserMoves);
      } else {
        pushSwitchLeadingSideMove(moveTiming.startTime, loserMoves);
        pushProbeMove(moveTiming.startTime, winnerMoves);
      }
    }
  });

  return {
    leftBoxerMoves: winner === 'left' ? winnerMoves : loserMoves,
    rightBoxerMoves: winner === 'left' ? loserMoves : winnerMoves,
  };
};

export default calculateMoves;
