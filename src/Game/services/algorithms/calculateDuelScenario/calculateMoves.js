import duelParameters from '../../constants/duelParameters';
import duelAnimationsNames from '../../constants/duelAnimationsNames';


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

  fittedAttackIntervals.forEach(fittedAttackInterval => {
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

    if (index == 0) {
      time = 0;
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

  winnerMovesTimings.forEach(winnerMoveTiming => {
    let offensiveMove, defensiveMove, probeMove;
    let randomChance;
    let randomIndex;

    if (winnerMoveTiming.type == 'probe') {
      randomIndex = Math.floor(Math.random() * duelAnimationsNames.probe.length);
      probeMove = duelAnimationsNames.probe[randomIndex];
      winnerMoves.push({
        startTime: winnerMoveTiming.startTime,
        move: probeMove,
      });

      randomIndex = Math.floor(Math.random() * duelAnimationsNames.probe.length);
      probeMove = duelAnimationsNames.probe[randomIndex];
      loserMoves.push({
        startTime: winnerMoveTiming.startTime,
        move: probeMove,
      });
    } else if ((winnerMoveTiming.type == 'attack') == (winner == 'left')) {
      randomChance = Math.random();
      if (randomChance < leftBoxersChancesOfMoves.offensive.chanceOfBruteForceAttack) {
        randomIndex = Math.floor(Math.random() * duelAnimationsNames.offensive.bruteForceAttack.length);
        offensiveMove = duelAnimationsNames.offensive.bruteForceAttack[randomIndex];
      } else if (randomChance < leftBoxersChancesOfMoves.offensive.chanceOfBruteForceAttack + leftBoxersChancesOfMoves.offensive.chanceOfDeceptiveAttack) {
        randomIndex = Math.floor(Math.random() * duelAnimationsNames.offensive.deceptiveAttack.length);
        offensiveMove = duelAnimationsNames.offensive.deceptiveAttack[randomIndex];
      } else {
        randomIndex = Math.floor(Math.random() * duelAnimationsNames.offensive.effectiveAttack.length);
        offensiveMove = duelAnimationsNames.offensive.effectiveAttack[randomIndex];
      }
      winnerMoves.push({
        startTime: winnerMoveTiming.startTime,
        move: offensiveMove,
      });

      randomChance = Math.random();
      if (randomChance < rightBoxersChancesOfMoves.defensive.chanceOfBlock) {
        randomIndex = Math.floor(Math.random() * duelAnimationsNames.defensive.block.length);
        defensiveMove = duelAnimationsNames.defensive.block[randomIndex];
      } else if (randomChance < rightBoxersChancesOfMoves.defensive.chanceOfBlock + rightBoxersChancesOfMoves.defensive.chanceOfDodge) {
        randomIndex = Math.floor(Math.random() * duelAnimationsNames.defensive.dodge.length);
        defensiveMove = duelAnimationsNames.defensive.dodge[randomIndex];
      } else {
        randomIndex = Math.floor(Math.random() * duelAnimationsNames.defensive.counterAttack.length);
        defensiveMove = duelAnimationsNames.defensive.counterAttack[randomIndex];
      }
      const reactionTime = duelParameters.reactionTimeCoefficient * duelParameters.moveDuration;
      loserMoves.push({
        startTime: winnerMoveTiming.startTime + reactionTime,
        move: defensiveMove,
      });
    } else {
      randomChance = Math.random();
      if (randomChance < rightBoxersChancesOfMoves.offensive.chanceOfBruteForceAttack) {
        randomIndex = Math.floor(Math.random() * duelAnimationsNames.offensive.bruteForceAttack.length);
        offensiveMove = duelAnimationsNames.offensive.bruteForceAttack[randomIndex];
      } else if (randomChance < rightBoxersChancesOfMoves.offensive.chanceOfBruteForceAttack + rightBoxersChancesOfMoves.offensive.chanceOfDeceptiveAttack) {
        randomIndex = Math.floor(Math.random() * duelAnimationsNames.offensive.deceptiveAttack.length);
        offensiveMove = duelAnimationsNames.offensive.deceptiveAttack[randomIndex];
      } else {
        randomIndex = Math.floor(Math.random() * duelAnimationsNames.offensive.effectiveAttack.length);
        offensiveMove = duelAnimationsNames.offensive.effectiveAttack[randomIndex];
      }
      winnerMoves.push({
        startTime: winnerMoveTiming.startTime,
        move: offensiveMove,
      });

      randomChance = Math.random();
      if (randomChance < leftBoxersChancesOfMoves.defensive.chanceOfBlock) {
        randomIndex = Math.floor(Math.random() * duelAnimationsNames.defensive.block.length);
        defensiveMove = duelAnimationsNames.defensive.block[randomIndex];
      } else if (randomChance < leftBoxersChancesOfMoves.defensive.chanceOfBlock + leftBoxersChancesOfMoves.defensive.chanceOfDodge) {
        randomIndex = Math.floor(Math.random() * duelAnimationsNames.defensive.dodge.length);
        defensiveMove = duelAnimationsNames.defensive.dodge[randomIndex];
      } else {
        randomIndex = Math.floor(Math.random() * duelAnimationsNames.defensive.counterAttack.length);
        defensiveMove = duelAnimationsNames.defensive.counterAttack[randomIndex];
      }
      const reactionTime = duelParameters.reactionTimeCoefficient * duelParameters.moveDuration;
      loserMoves.push({
        startTime: winnerMoveTiming.startTime + reactionTime,
        move: defensiveMove,
      });
    }
  });

  return {
    leftBoxersMoves: winner == 'left' ? winnerMoves : loserMoves,
    rightBoxersMoves: winner == 'left' ? loserMoves : winnerMoves,
  };
};

export default calculateMoves;
