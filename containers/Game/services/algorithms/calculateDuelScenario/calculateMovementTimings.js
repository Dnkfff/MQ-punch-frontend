/** @module containers/Game/services/algorithms/calculateDuelScenario/calculateMovementTimings */

import calculateAttackIntervals from './calculateAttackIntervals';

import duelParameters from '../../constants/duelParameters';

/**
  @summary Calculates movement timings based on chances and random
  @param leftBoxerLeadingSide left boxer leading side
  @param rightBoxerLeadingSide right boxer leading side
  @param winner winner (left or right)
  @returns the list of objects that contains startTime, winnerMovementType,
  winnerLeadingSide, loserLeadingSide, winnerMiss and loserMiss
*/
const calculateMovementTimings = (leftBoxerLeadingSide, rightBoxerLeadingSide, winner) => {
  // movement timings are for winner only
  // so loser movements are generated as opposite ones
  let movementTimings = [];

  // "translating" left-right to winner-loser
  let winnerLeadingSide = winner === 'left' ? leftBoxerLeadingSide : rightBoxerLeadingSide;
  let loserLeadingSide = winner === 'left' ? rightBoxerLeadingSide : leftBoxerLeadingSide;

  // calculating attack intervals
  // so there will be probe movements between them
  // and attacks and defense within
  const attackIntervals = calculateAttackIntervals();

  // begin from zero time moment
  let time = 0;

  // for each attack interval
  attackIntervals.forEach((attackInterval) => {
    // until current attack interval began
    while (time < attackInterval.startTime) {
      // add probe movement
      movementTimings.push({
        startTime: time,
        winnerMovementType: 'probe',
        winnerLeadingSide,
        loserLeadingSide,
        winnerMiss: true,
        loserMiss: true,
      });

      // update current time with value big enough for the movement
      const randomMultiplier = Math.random() * duelParameters.probeRestDurationCoefficient;
      time += duelParameters.movementDuration * (1.0 + randomMultiplier);
    }

    // calculating current attack interval end time
    const endTime = attackInterval.startTime + attackInterval.duration;
    // calculating maximal time for boxer to react
    const reactionTime = duelParameters.reactionTimeCoefficient * duelParameters.movementDuration;

    // until current interval ended
    while (time + reactionTime <= endTime) {
      let movementType;

      let chance = Math.random();

      // offensive movement
      if (chance < duelParameters.chanceOfOffensiveMovement) {
        movementType = 'offensive';
      }

      // defensive movement
      else if (
        chance <
        duelParameters.chanceOfOffensiveMovement + duelParameters.chanceOfDefensiveMovement
      ) {
        movementType = 'defensive';
      }

      // probe movement
      else if (
        chance <
        duelParameters.chanceOfOffensiveMovement +
          duelParameters.chanceOfDefensiveMovement +
          duelParameters.chanceOfProbeMovement
      ) {
        movementType = 'probe';
      }

      // switch leading side movement
      else {
        // choosing who will change his leading side
        chance = Math.random();

        // winner
        if (chance < 0.5) {
          movementType = 'switchLeadingSide-winner';
          if (winnerLeadingSide === 'left') {
            winnerLeadingSide = 'right';
          } else {
            winnerLeadingSide = 'left';
          }
        }

        // loser
        else {
          movementType = 'switchLeadingSide-loser';
          if (loserLeadingSide === 'left') {
            loserLeadingSide = 'right';
          } else {
            loserLeadingSide = 'left';
          }
        }
      }

      // pushing new movement timing
      // calculating chances of missing for each boxer
      movementTimings.push({
        startTime: time,
        winnerMovementType: movementType,
        winnerLeadingSide,
        loserLeadingSide,
        winnerMiss: Math.random() < duelParameters.chanceOfMiss,
        loserMiss: Math.random() < duelParameters.chanceOfMiss,
      });

      // update current time with value big enough for the movement
      const randomMultiplier = Math.random() * duelParameters.attackRestDurationCoefficient;
      time += duelParameters.movementDuration * (1.0 + randomMultiplier);
    }
  });

  // making sure the last offense is by winner
  movementTimings.push({
    startTime: time,
    winnerMovementType: 'offensive',
    winnerLeadingSide,
    loserLeadingSide,
    winnerMiss: false,
    loserMiss: true,
  });

  return movementTimings;
};

export default calculateMovementTimings;
