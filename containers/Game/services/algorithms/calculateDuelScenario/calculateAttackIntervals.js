/** @module containers/Game/services/algorithms/calculateDuelScenario/calculateAttackIntervals */

import duelParameters from "../../constants/duelParameters";

/**
  @summary Fits attack intervals in time
  @param attackIntervals attack intervals list
*/
const fitAttackIntervalsInTime = (attackIntervals) => {
  // calculating current duration of attack intervals for further reducing
  const lastAttackInterval = attackIntervals[attackIntervals.length - 1];
  const currentDurationOfAttackIntervals =
    lastAttackInterval.startTime + lastAttackInterval.duration;

  // calculating delta time of the last movement
  // so the duel won't end before the last movement does
  const reactionTime =
    duelParameters.reactionTimeCoefficient * duelParameters.movementDuration;
  const lastMovementDeltaTime =
    duelParameters.movementDuration *
      (1.0 + duelParameters.probeRestDurationCoefficient) +
    reactionTime;

  // calculating the final coefficient for reducing
  const fitCoefficient =
    (duelParameters.duelDuration - lastMovementDeltaTime) /
    currentDurationOfAttackIntervals;

  // fitting start time and duration
  attackIntervals.forEach((attackInterval) => {
    attackInterval.startTime *= fitCoefficient;
    attackInterval.duration *= fitCoefficient;
  });
};

/**
  @summary Calculates attack intervals based on chances and random
  @returns attack intervals list
*/
const calculateAttackIntervals = () => {
  let attackIntervals = [];

  let randomMultiplier;

  // make a little delay for the first attack interval to start
  randomMultiplier =
    1.0 +
    duelParameters.intervalDurationRandomBooster * (Math.random() * 2.0 - 1.0);
  let previousAttackIntervalEndTime =
    duelParameters.probeIntervalDurationCoefficient * randomMultiplier;

  // for each attack interval
  for (let i = 0; i < duelParameters.numberOfAttackIntervals; i++) {
    // calculating start time of new attack interval
    randomMultiplier =
      1.0 +
      duelParameters.intervalDurationRandomBooster *
        (Math.random() * 2.0 - 1.0);
    const attackIntervalStartTime =
      previousAttackIntervalEndTime +
      duelParameters.probeIntervalDurationCoefficient * randomMultiplier;

    // calculating duration of new attack interval
    randomMultiplier =
      1.0 +
      duelParameters.intervalDurationRandomBooster *
        (Math.random() * 2.0 - 1.0);
    const attackIntervalDuration =
      duelParameters.attackIntervalDurationCoefficient * randomMultiplier;

    // pushing new attack interval
    attackIntervals.push({
      startTime: attackIntervalStartTime,
      duration: attackIntervalDuration,
    });

    // update previous attack interval end time
    previousAttackIntervalEndTime =
      attackIntervalStartTime + attackIntervalDuration;
  }

  // fitting attack intervals int time
  // so that they occupy the time needed
  fitAttackIntervalsInTime(attackIntervals);

  return attackIntervals;
};

export default calculateAttackIntervals;
