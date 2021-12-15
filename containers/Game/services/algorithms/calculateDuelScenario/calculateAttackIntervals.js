import duelParameters from '../../constants/duelParameters';


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

export default calculateAttackIntervals;
