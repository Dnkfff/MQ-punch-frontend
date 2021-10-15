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

const calculateWinnerMovesTimings = () => {
  let winnerMovesTimings = [];

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
      winnerMovesTimings.push({
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

      winnerMovesTimings.push({
        startTime: time,
        type: moveType,
      });

      randomMultiplier = duelParameters.attackRestDurationCoefficient * Math.random();
      time += duelParameters.moveDuration * (1.0 + randomMultiplier);
    }

    winnerMovesTimings.push({
      startTime: time,
      type: 'offensive',
    });
  });

  return winnerMovesTimings;
};

const calculateMoves = (leftBoxersChancesOfMoves, rightBoxersChancesOfMoves, winner) => {
  let winnerMoves = [], loserMoves = [];

  const winnerMovesTimings = calculateWinnerMovesTimings();

  winnerMovesTimings.forEach((winnerMoveTiming) => {
    let randomChance;
    let randomIndex;
    let lowerBodyMove, upperBodyMove;
    const pushProbeMove = (moves) => {
      randomIndex = Math.floor(Math.random() * duelAnimationNames.probe.lower.length);
      lowerBodyMove = duelAnimationNames.probe.lower[randomIndex];
      randomIndex = Math.floor(Math.random() * duelAnimationNames.probe.upper.length);
      upperBodyMove = duelAnimationNames.probe.upper[randomIndex];
      moves.push({
        startTime: winnerMoveTiming.startTime,
        move: {
          lower: lowerBodyMove,
          upper: upperBodyMove,
        },
      });
    };
    const pushOffensiveMove = (moves, chancesOfMoves) => {
      randomChance = Math.random();
      if (randomChance < chancesOfMoves.offensive.chanceOfBruteForceAttack) {
        randomIndex = Math.floor(Math.random() * duelAnimationNames.offensive.bruteForceAttack.lower.length);
        lowerBodyMove = duelAnimationNames.offensive.bruteForceAttack.lower[randomIndex];
        randomIndex = Math.floor(Math.random() * duelAnimationNames.offensive.bruteForceAttack.upper.length);
        upperBodyMove = duelAnimationNames.offensive.bruteForceAttack.upper[randomIndex];
      } else if (randomChance < chancesOfMoves.offensive.chanceOfBruteForceAttack + chancesOfMoves.offensive.chanceOfDeceptiveAttack) {
        randomIndex = Math.floor(Math.random() * duelAnimationNames.offensive.deceptiveAttack.lower.length);
        lowerBodyMove = duelAnimationNames.offensive.deceptiveAttack.lower[randomIndex];
        randomIndex = Math.floor(Math.random() * duelAnimationNames.offensive.deceptiveAttack.upper.length);
        upperBodyMove = duelAnimationNames.offensive.deceptiveAttack.upper[randomIndex];
      } else {
        randomIndex = Math.floor(Math.random() * duelAnimationNames.offensive.effectiveAttack.lower.length);
        lowerBodyMove = duelAnimationNames.offensive.effectiveAttack.lower[randomIndex];
        randomIndex = Math.floor(Math.random() * duelAnimationNames.offensive.effectiveAttack.upper.length);
        upperBodyMove = duelAnimationNames.offensive.effectiveAttack.upper[randomIndex];
      }
      moves.push({
        startTime: winnerMoveTiming.startTime,
        move: {
          lower: lowerBodyMove,
          upper: upperBodyMove,
        },
      });
    };
    const pushDefensiveMove = (moves, chancesOfMoves) => {
      randomChance = Math.random();
      if (randomChance < chancesOfMoves.defensive.chanceOfBlock) {
        randomIndex = Math.floor(Math.random() * duelAnimationNames.defensive.block.lower.length);
        lowerBodyMove = duelAnimationNames.defensive.block.lower[randomIndex];
        randomIndex = Math.floor(Math.random() * duelAnimationNames.defensive.block.upper.length);
        upperBodyMove = duelAnimationNames.defensive.block.upper[randomIndex];
      } else if (randomChance < chancesOfMoves.defensive.chanceOfBlock + chancesOfMoves.defensive.chanceOfDodge) {
        randomIndex = Math.floor(Math.random() * duelAnimationNames.defensive.dodge.lower.length);
        lowerBodyMove = duelAnimationNames.defensive.dodge.lower[randomIndex];
        randomIndex = Math.floor(Math.random() * duelAnimationNames.defensive.dodge.upper.length);
        upperBodyMove = duelAnimationNames.defensive.dodge.upper[randomIndex];
      } else {
        randomIndex = Math.floor(Math.random() * duelAnimationNames.defensive.counterAttack.lower.length);
        lowerBodyMove = duelAnimationNames.defensive.counterAttack.lower[randomIndex];
        randomIndex = Math.floor(Math.random() * duelAnimationNames.defensive.counterAttack.upper.length);
        upperBodyMove = duelAnimationNames.defensive.counterAttack.upper[randomIndex];
      }
      const reactionTime = duelParameters.reactionTimeCoefficient * duelParameters.moveDuration;
      moves.push({
        startTime: winnerMoveTiming.startTime + reactionTime,
        move: {
          lower: lowerBodyMove,
          upper: upperBodyMove,
        },
      });
    };

    if (winnerMoveTiming.type === 'probe') {
      pushProbeMove(winnerMoves);
      pushProbeMove(loserMoves);
    } else if ((winnerMoveTiming.type === 'attack') === (winner === 'left')) {
      pushOffensiveMove(winnerMoves, leftBoxersChancesOfMoves);
      pushDefensiveMove(loserMoves, rightBoxersChancesOfMoves);
    } else {
      pushOffensiveMove(winnerMoves, rightBoxersChancesOfMoves);
      pushDefensiveMove(loserMoves, leftBoxersChancesOfMoves);
    }
  });

  return {
    leftBoxersMoves: winner === 'left' ? winnerMoves : loserMoves,
    rightBoxersMoves: winner === 'left' ? loserMoves : winnerMoves,
  };
};

export default calculateMoves;
