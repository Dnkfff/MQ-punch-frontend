import duelParameters from '../constants/duelParameters';
import duelAnimationsNames from '../constants/duelAnimationsNames';


const calculateChancesOfOffensiveMoves = (boxersStats) => {
  const bruteForceAttackCoefficient = (boxersStats.strength * 2 + boxersStats.endurance * 1) * (0.9 + 0.2 * Math.random());
  const deceptiveAttackCoefficient = (boxersStats.agility * 2 + boxersStats.strength * 1) * (0.9 + 0.2 * Math.random());
  const effectiveAttackCoefficient = (boxersStats.endurance * 2 + boxersStats.agility * 1) * (0.9 + 0.2 * Math.random());

  const sumOfCoefficients = bruteForceAttackCoefficient + deceptiveAttackCoefficient + effectiveAttackCoefficient;

  return {
    chanceOfBruteForceAttack: bruteForceAttackCoefficient / sumOfCoefficients,
    chanceOfDeceptiveAttack: deceptiveAttackCoefficient / sumOfCoefficients,
    chanceOfEffectiveAttack: effectiveAttackCoefficient / sumOfCoefficients,
  };
};

const calculateChancesOfDefensiveMoves = (boxersStats) => {
  const blockCoefficient = (boxersStats.endurance * 2 + boxersStats.strength * 1) * (0.9 + 0.2 * Math.random());
  const dodgeCoefficient = (boxersStats.agility * 2 + boxersStats.endurance * 1) * (0.9 + 0.2 * Math.random());
  const counterAttackCoefficient = (boxersStats.strength * 2 + boxersStats.agility * 1) * (0.9 + 0.2 * Math.random());

  const sumOfCoefficients = blockCoefficient + dodgeCoefficient + counterAttackCoefficient;

  return {
    chanceOfBlock: blockCoefficient / sumOfCoefficients,
    chanceOfDodge: dodgeCoefficient / sumOfCoefficients,
    chanceOfCounterAttack: counterAttackCoefficient / sumOfCoefficients,
  };
};

const calculateChancesToWin = (leftBoxersStats, rightBoxersStats) => {
  const sumOfLeftBoxersStats = (leftBoxersStats.strength + leftBoxersStats.agility + leftBoxersStats.endurance) * (0.9 + 0.2 * Math.random());
  const sumOfRightBoxersStats = (rightBoxersStats.strength + rightBoxersStats.agility + rightBoxersStats.endurance) * (0.9 + 0.2 * Math.random());

  const sumOfStats = sumOfLeftBoxersStats + sumOfRightBoxersStats;

  return {
    chanceForLeftBoxerToWin: sumOfLeftBoxersStats / sumOfStats,
    chanceForRightBoxerToWin: sumOfRightBoxersStats / sumOfStats,
  };
};

const fitAttackIntervalsInTime = (attackIntervals) => {
  const lastAttackInterval = attackIntervals[attackIntervals.length - 1];
  const currentDurationOfAttackIntervals = lastAttackInterval.startTime + lastAttackInterval.duration;
  const fitCoefficient = duelParameters.duelDuration / currentDurationOfAttackIntervals;

  attackIntervals.forEach(attackInterval => {
    attackInterval.startTime *= fitCoefficient;
    attackInterval.duration *= fitCoefficient;
  });

  return attackIntervals;
};

const calculateAttackIntervals = () => {
  let attackIntervals = [];

  let previousAttackIntervalEndTime = 0;
  for (let i = 0; i < duelParameters.numberOfAttackIntervals; i++) {
    const attackIntervalStartTime = previousAttackIntervalEndTime + duelParameters.probeIntervalDurationCoefficient * Math.random();
    const attackIntervalDuration = duelParameters.attackIntervalDurationCoefficient * Math.random();

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

      time += duelParameters.moveDuration * (1 + 2 * duelParameters.restDurationCoefficient * Math.random());
    }

    time = attackInterval.startTime;
    while (time < attackInterval.startTime + attackInterval.duration) {
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

      time += duelParameters.moveDuration * (1 + duelParameters.restDurationCoefficient * Math.random());
    }
  });

  return winnerMovesTimings;
};

const calculateMoves = (leftBoxersChancesOfMoves, rightBoxersChancesOfMoves, winner) => {
  let winnerMoves = [], loserMoves = [];

  const winnerMovesTimings = calculateWinnerMovesTimings();

  winnerMovesTimings.forEach(winnerMoveTiming => {
    let offensiveMove, defensiveMove, probeMove;
    let chance;
    let index;

    if (winnerMoveTiming.type == 'probe') {
      index = Math.floor(Math.random() * duelAnimationsNames.probe.length);
      probeMove = duelAnimationsNames.probe[index];
      winnerMoves.push({
        startTime: winnerMoveTiming.startTime,
        move: probeMove,
      });

      index = Math.floor(Math.random() * duelAnimationsNames.probe.length);
      probeMove = duelAnimationsNames.probe[index];
      loserMoves.push({
        startTime: winnerMoveTiming.startTime,
        move: probeMove,
      });
    } else if ((winnerMoveTiming.type == 'attack') == (winner == 'left')) {
      chance = Math.random();
      if (chance < leftBoxersChancesOfMoves.offensive.chanceOfBruteForceAttack) {
        index = Math.floor(Math.random() * duelAnimationsNames.offensive.bruteForceAttack.length);
        offensiveMove = duelAnimationsNames.offensive.bruteForceAttack[index];
      } else if (chance < leftBoxersChancesOfMoves.offensive.chanceOfBruteForceAttack + leftBoxersChancesOfMoves.offensive.chanceOfDeceptiveAttack) {
        index = Math.floor(Math.random() * duelAnimationsNames.offensive.deceptiveAttack.length);
        offensiveMove = duelAnimationsNames.offensive.deceptiveAttack[index];
      } else {
        index = Math.floor(Math.random() * duelAnimationsNames.offensive.effectiveAttack.length);
        offensiveMove = duelAnimationsNames.offensive.effectiveAttack[index];
      }
      winnerMoves.push({
        startTime: winnerMoveTiming.startTime,
        move: offensiveMove,
      });

      chance = Math.random();
      if (chance < rightBoxersChancesOfMoves.defensive.chanceOfBlock) {
        index = Math.floor(Math.random() * duelAnimationsNames.defensive.block.length);
        defensiveMove = duelAnimationsNames.defensive.block[index];
      } else if (chance < rightBoxersChancesOfMoves.defensive.chanceOfBlock + rightBoxersChancesOfMoves.defensive.chanceOfDodge) {
        index = Math.floor(Math.random() * duelAnimationsNames.defensive.dodge.length);
        defensiveMove = duelAnimationsNames.defensive.dodge[index];
      } else {
        index = Math.floor(Math.random() * duelAnimationsNames.defensive.counterAttack.length);
        defensiveMove = duelAnimationsNames.defensive.counterAttack[index];
      }
      loserMoves.push({
        startTime: winnerMoveTiming.startTime + duelParameters.reactionTime,
        move: defensiveMove,
      });
    } else {
      chance = Math.random();
      if (chance < rightBoxersChancesOfMoves.offensive.chanceOfBruteForceAttack) {
        index = Math.floor(Math.random() * duelAnimationsNames.offensive.bruteForceAttack.length);
        offensiveMove = duelAnimationsNames.offensive.bruteForceAttack[index];
      } else if (chance < rightBoxersChancesOfMoves.offensive.chanceOfBruteForceAttack + rightBoxersChancesOfMoves.offensive.chanceOfDeceptiveAttack) {
        index = Math.floor(Math.random() * duelAnimationsNames.offensive.deceptiveAttack.length);
        offensiveMove = duelAnimationsNames.offensive.deceptiveAttack[index];
      } else {
        index = Math.floor(Math.random() * duelAnimationsNames.offensive.effectiveAttack.length);
        offensiveMove = duelAnimationsNames.offensive.effectiveAttack[index];
      }
      winnerMoves.push({
        startTime: winnerMoveTiming.startTime,
        move: offensiveMove,
      });

      chance = Math.random();
      if (chance < leftBoxersChancesOfMoves.defensive.chanceOfBlock) {
        index = Math.floor(Math.random() * duelAnimationsNames.defensive.block.length);
        defensiveMove = duelAnimationsNames.defensive.block[index];
      } else if (chance < leftBoxersChancesOfMoves.defensive.chanceOfBlock + leftBoxersChancesOfMoves.defensive.chanceOfDodge) {
        index = Math.floor(Math.random() * duelAnimationsNames.defensive.dodge.length);
        defensiveMove = duelAnimationsNames.defensive.dodge[index];
      } else {
        index = Math.floor(Math.random() * duelAnimationsNames.defensive.counterAttack.length);
        defensiveMove = duelAnimationsNames.defensive.counterAttack[index];
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
  const winner = (Math.random() < chanceForLeftBoxerToWin ? 'left' : 'right');

  const duelScenario = calculateMoves(leftBoxersChancesOfMoves, rightBoxersChancesOfMoves, winner);

  return duelScenario;
};

export default calculateDuelScenario;
