import duelEconomics from '../constants/duelEconomics';
import duelParameters from '../constants/duelParameters';
import duelAnimationsNames from '../constants/duelAnimationsNames';


const calculateChancesOfOffensiveMoves = (boxersStats) => {
  let randomMultiplier;
  randomMultiplier = 1.0 + duelParameters.chancesOfMovesBooster * (-1.0 + 2.0 * Math.random());
  const bruteForceAttackCoefficient = (boxersStats.strength * 2.0 + boxersStats.endurance * 1.0) * randomMultiplier;
  randomMultiplier = 1.0 + duelParameters.chancesOfMovesBooster * (-1.0 + 2.0 * Math.random());
  const deceptiveAttackCoefficient = (boxersStats.agility * 2.0 + boxersStats.strength * 1.0) * randomMultiplier;
  randomMultiplier = 1.0 + duelParameters.chancesOfMovesBooster * (-1.0 + 2.0 * Math.random());
  const effectiveAttackCoefficient = (boxersStats.endurance * 2.0 + boxersStats.agility * 1.0) * randomMultiplier;

  const sumOfCoefficients = bruteForceAttackCoefficient + deceptiveAttackCoefficient + effectiveAttackCoefficient;

  return {
    chanceOfBruteForceAttack: bruteForceAttackCoefficient / sumOfCoefficients,
    chanceOfDeceptiveAttack: deceptiveAttackCoefficient / sumOfCoefficients,
    chanceOfEffectiveAttack: effectiveAttackCoefficient / sumOfCoefficients,
  };
};

const calculateChancesOfDefensiveMoves = (boxersStats) => {
  let randomMultiplier;
  randomMultiplier = 1.0 + duelParameters.chancesOfMovesBooster * (-1.0 + 2.0 * Math.random());
  const blockCoefficient = (boxersStats.endurance * 2.0 + boxersStats.strength * 1.0) * randomMultiplier;
  randomMultiplier = 1.0 + duelParameters.chancesOfMovesBooster * (-1.0 + 2.0 * Math.random());
  const dodgeCoefficient = (boxersStats.agility * 2.0 + boxersStats.endurance * 1.0) * randomMultiplier;
  randomMultiplier = 1.0 + duelParameters.chancesOfMovesBooster * (-1.0 + 2.0 * Math.random());
  const counterAttackCoefficient = (boxersStats.strength * 2.0 + boxersStats.agility * 1.0) * randomMultiplier;

  const sumOfCoefficients = blockCoefficient + dodgeCoefficient + counterAttackCoefficient;

  return {
    chanceOfBlock: blockCoefficient / sumOfCoefficients,
    chanceOfDodge: dodgeCoefficient / sumOfCoefficients,
    chanceOfCounterAttack: counterAttackCoefficient / sumOfCoefficients,
  };
};

const calculateChancesToWin = (leftBoxersStats, rightBoxersStats) => {
  let randomMultiplier;
  randomMultiplier = 1.0 + duelEconomics.chancesToWinBooster * (-1.0 + 2.0 * Math.random());
  const sumOfLeftBoxersStats = (leftBoxersStats.strength + leftBoxersStats.agility + leftBoxersStats.endurance) * randomMultiplier;
  randomMultiplier = 1.0 + duelEconomics.chancesToWinBooster * (-1.0 + 2.0 * Math.random());
  const sumOfRightBoxersStats = (rightBoxersStats.strength + rightBoxersStats.agility + rightBoxersStats.endurance) * randomMultiplier;

  const sumOfStats = sumOfLeftBoxersStats + sumOfRightBoxersStats;

  return {
    chanceForLeftBoxerToWin: sumOfLeftBoxersStats / sumOfStats,
    chanceForRightBoxerToWin: sumOfRightBoxersStats / sumOfStats,
  };
};

const fitAttackIntervalsInTime = (attackIntervals) => {
  const fittedAttackIntervals = attackIntervals.map(attackInterval => {return {
    startTime: attackInterval.startTime,
    duration: attackInterval.duration,
  }});

  const lastAttackInterval = fittedAttackIntervals[fittedAttackIntervals.length - 1];
  const currentDurationOfAttackIntervals = lastAttackInterval.startTime + lastAttackInterval.duration;
  const lastMoveDeltaTime = duelParameters.moveDuration * (1.0 + duelParameters.probeRestDurationCoefficient) + duelParameters.reactionTime;
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

  randomMultiplier = 1.0 + duelParameters.intervalDurationBooster * (-1.0 + 2.0 * Math.random());
  let previousAttackIntervalEndTime = duelParameters.probeIntervalDurationCoefficient * randomMultiplier;
  for (let i = 0; i < duelParameters.numberOfAttackIntervals; i++) {
    randomMultiplier = 1.0 + duelParameters.intervalDurationBooster * (-1.0 + 2.0 * Math.random());
    const attackIntervalStartTime = previousAttackIntervalEndTime + duelParameters.probeIntervalDurationCoefficient * randomMultiplier;
    randomMultiplier = 1.0 + duelParameters.intervalDurationBooster * (-1.0 + 2.0 * Math.random());
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
    while (time + duelParameters.reactionTime < endTime) {
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
      loserMoves.push({
        startTime: winnerMoveTiming.startTime + duelParameters.reactionTime,
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
      loserMoves.push({
        startTime: winnerMoveTiming.startTime + duelParameters.reactionTime,
        move: defensiveMove,
      });
    }
  });

  return {
    leftBoxersMoves: winner == 'left' ? winnerMoves : loserMoves,
    rightBoxersMoves: winner == 'left' ? loserMoves : winnerMoves,
  };
};

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
  const winner = (randomChance < chanceForLeftBoxerToWin ? 'left' : 'right');

  const duelScenario = calculateMoves(leftBoxersChancesOfMoves, rightBoxersChancesOfMoves, winner);

  return duelScenario;
};

export default calculateDuelScenario;
