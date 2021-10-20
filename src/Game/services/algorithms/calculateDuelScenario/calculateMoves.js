import duelParameters from '../../constants/duelParameters';
import duelAnimationNames from '../../constants/duelAnimationNames';


const fitAttackIntervalsInTime = (attackIntervals) => {
  const fittedAttackIntervals = attackIntervals.map(attackInterval => {
    return {
      startTime: attackInterval.startTime,
      duration: attackInterval.duration,
    };
  });

  const lastAttackInterval = fittedAttackIntervals[fittedAttackIntervals.length - 1];
  const currentDurationOfAttackIntervals = lastAttackInterval.startTime + lastAttackInterval.duration;
  const reactionTime = duelParameters.reactionTimeCoefficient * duelParameters.moveDuration;
  const lastMoveDeltaTime = duelParameters.moveDuration * (1.0 + duelParameters.probeRestDurationCoefficient) + reactionTime;
  const fitCoefficient = (duelParameters.duelDuration - lastMoveDeltaTime) / currentDurationOfAttackIntervals;

  fittedAttackIntervals.forEach((fittedAttackInterval) => {
    fittedAttackInterval.startTime *= fitCoefficient;
    fittedAttackInterval.duration *= fitCoefficient;
  });

  return fittedAttackIntervals;
};

const calculateAttackIntervals = () => {
  let attackIntervals = [];

  let randomMultiplier;

  randomMultiplier = 1.0 + duelParameters.intervalDurationRandomBooster * (-1.0 + 2.0 * Math.random());
  let previousAttackIntervalEndTime = duelParameters.probeIntervalDurationCoefficient * randomMultiplier;
  for (let i = 0; i < duelParameters.numberOfAttackIntervals; i++) {
    randomMultiplier = 1.0 + duelParameters.intervalDurationRandomBooster * (-1.0 + 2.0 * Math.random());
    const attackIntervalStartTime = previousAttackIntervalEndTime + duelParameters.probeIntervalDurationCoefficient * randomMultiplier;
    randomMultiplier = 1.0 + duelParameters.intervalDurationRandomBooster * (-1.0 + 2.0 * Math.random());
    const attackIntervalDuration = duelParameters.attackIntervalDurationCoefficient * randomMultiplier;

    attackIntervals.push({
      startTime: attackIntervalStartTime,
      duration: attackIntervalDuration,
    });

    previousAttackIntervalEndTime = attackIntervalStartTime + attackIntervalDuration;
  }

  attackIntervals = fitAttackIntervalsInTime(attackIntervals);

  return attackIntervals;
};

const calculateWinnerMoveTimings = () => {
  let winnerMoveTimings = [];

  const attackIntervals = calculateAttackIntervals();

  attackIntervals.forEach((attackInterval, index) => {
    let time;

    let randomMultiplier;

    if (index === 0) {
      time = 0.0;
    } else {
      time = attackIntervals[index - 1].startTime + attackIntervals[index - 1].duration;
    }
    while (time < attackInterval.startTime) {
      winnerMoveTimings.push({
        startTime: time,
        type: 'probe',
      });

      randomMultiplier = duelParameters.probeRestDurationCoefficient * Math.random();
      time += duelParameters.moveDuration * (1.0 + randomMultiplier);
    }

    time = attackInterval.startTime;
    const endTime = attackInterval.startTime + attackInterval.duration;
    const reactionTime = duelParameters.reactionTimeCoefficient * duelParameters.moveDuration;
    while (time + reactionTime < endTime) {
      let moveType;

      let chance = Math.random();
      if (chance < 0.4) {
        moveType = 'offensive';
      } else if (chance < 0.8) {
        moveType = 'defensive';
      } else {
        moveType = 'probe';
      }

      winnerMoveTimings.push({
        startTime: time,
        type: moveType,
      });

      randomMultiplier = duelParameters.attackRestDurationCoefficient * Math.random();
      time += duelParameters.moveDuration * (1.0 + randomMultiplier);
    }

    winnerMoveTimings.push({
      startTime: time,
      type: 'offensive',
    });
  });

  return winnerMoveTimings;
};

const calculateMoves = (leftBoxerChancesOfMoves, rightBoxerChancesOfMoves, winner) => {
  let winnerMoves = [], loserMoves = [];

  const winnerMoveTimings = calculateWinnerMoveTimings();

  winnerMoveTimings.forEach((winnerMoveTiming) => {
    let randomChance;
    let randomIndex;
    let lowerBodyMove, upperBodyMove;
    const pushProbeMove = (moves) => {
      randomIndex = Math.floor(Math.random() * duelAnimationNames.lower.length);
      lowerBodyMove = duelAnimationNames.lower[randomIndex];
      randomIndex = Math.floor(Math.random() * duelAnimationNames.upper.probe.length);
      upperBodyMove = duelAnimationNames.upper.probe[randomIndex];

      randomChance = Math.random();
      if (randomChance < duelParameters.chanceOfMove) {
        moves.push({
          startTime: winnerMoveTiming.startTime,
          move: {
            lower: lowerBodyMove,
            upper: upperBodyMove,
          },
        });
      }
    };
    const pushOffensiveMove = (moves, chancesOfMoves) => {
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
        moves.push({
          startTime: winnerMoveTiming.startTime,
          move: {
            lower: lowerBodyMove,
            upper: upperBodyMove,
          },
        });
      }
    };
    const pushDefensiveMove = (moves, chancesOfMoves) => {
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
        const reactionTime = duelParameters.reactionTimeCoefficient * duelParameters.moveDuration;
        moves.push({
          startTime: winnerMoveTiming.startTime + reactionTime,
          move: {
            lower: lowerBodyMove,
            upper: upperBodyMove,
          },
        });
      }
    };

    if (winnerMoveTiming.type === 'probe') {
      pushProbeMove(winnerMoves);
      pushProbeMove(loserMoves);
    } else if ((winnerMoveTiming.type === 'attack') === (winner === 'left')) {
      pushOffensiveMove(winnerMoves, leftBoxerChancesOfMoves);
      pushDefensiveMove(loserMoves, rightBoxerChancesOfMoves);
    } else {
      pushOffensiveMove(winnerMoves, rightBoxerChancesOfMoves);
      pushDefensiveMove(loserMoves, leftBoxerChancesOfMoves);
    }
  });

  return {
    leftBoxerMoves: winner === 'left' ? winnerMoves : loserMoves,
    rightBoxerMoves: winner === 'left' ? loserMoves : winnerMoves,
  };
};

export default calculateMoves;
