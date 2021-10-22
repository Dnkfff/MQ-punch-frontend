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
      move,
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

const pushProbeMove = ({ moveTimingStartTime, moves, leadingSide }) => {
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

const pushOffensiveMove = ({ moveTimingStartTime, moves, leadingSide, chancesOfMoves }) => {
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

const pushDefensiveMove = ({ moveTimingStartTime, moves, leadingSide, chancesOfMoves, offensiveMoveName }) => {
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

const pushSwitchLeadingSideMove = ({ moveTimingStartTime, moves }) => {
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
    const moveTimingStartTime = moveTiming.startTime;
    const leadingSide = moveTiming.loserLeadingSide;

    if (moveTiming.winnerMoveType === 'probe') {
      pushProbeMove({ moveTimingStartTime, moves: winnerMoves });
      pushProbeMove({ moveTimingStartTime, moves: loserMoves });
    } else if (moveTiming.winnerMoveType === 'offensive') {
      if (winner === 'left') {
        const offensiveMoveName = pushOffensiveMove({ moveTimingStartTime, moves: winnerMoves, leadingSide, chancesOfMoves: leftBoxerChancesOfMoves }).upper;
        pushDefensiveMove({ moveTimingStartTime, moves: loserMoves, leadingSide, chancesOfMoves: rightBoxerChancesOfMoves, offensiveMoveName });
      } else {
        const offensiveMoveName = pushOffensiveMove({ moveTimingStartTime, moves: winnerMoves, leadingSide, chancesOfMoves: rightBoxerChancesOfMoves }).upper;
        pushDefensiveMove({ moveTimingStartTime, moves: loserMoves, leadingSide, chancesOfMoves: leftBoxerChancesOfMoves, offensiveMoveName });
      }
    } else if (moveTiming.winnerMoveType === 'defensive') {
      if (winner === 'left') {
        const offensiveMoveName = pushOffensiveMove({ moveTimingStartTime, moves: loserMoves, leadingSide, chancesOfMoves: rightBoxerChancesOfMoves }).upper;
        pushDefensiveMove({ moveTimingStartTime, moves: winnerMoves, leadingSide, chancesOfMoves: leftBoxerChancesOfMoves, offensiveMoveName });
      } else {
        const offensiveMoveName = pushOffensiveMove({ moveTimingStartTime, moves: loserMoves, leadingSide, chancesOfMoves: leftBoxerChancesOfMoves }).upper;
        pushDefensiveMove({ moveTimingStartTime, moves: winnerMoves, leadingSide, chancesOfMoves: rightBoxerChancesOfMoves, offensiveMoveName });
      }
    } else {
      if (moveTiming.winnerMoveType === 'switchLeadingSide-winner') {
        pushSwitchLeadingSideMove({ moveTimingStartTime, moves: winnerMoves });
        pushProbeMove({ moveTimingStartTime, moves: loserMoves });
      } else {
        pushSwitchLeadingSideMove({ moveTimingStartTime, moves: loserMoves });
        pushProbeMove({ moveTimingStartTime, moves: winnerMoves });
      }
    }
  });

  return {
    leftBoxerMoves: winner === 'left' ? winnerMoves : loserMoves,
    rightBoxerMoves: winner === 'left' ? loserMoves : winnerMoves,
  };
};

export default calculateMoves;
