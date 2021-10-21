import calculateAttackIntervals from './calculateAttackIntervals';

import duelParameters from '../../constants/duelParameters';


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

export default calculateWinnerMoveTimings;
