/** @module containers/Game/services/algorithms/calculateDuelScenario/calculateMovementTimings */

import calculateAttackIntervals from './calculateAttackIntervals';

import duelParameters from '../../constants/duelParameters';

/**
  @summary Calculates movement timings based on chances and random
  @param leftBoxerLeadingSide left boxer leading side
  @param rightBoxerLeadingSide right boxer leading side
  @param winner winner (left or right)
  @returns the list of objects that contains startTime, leftBoxer
  and rightBoxer {movementType, leadingSide, miss}.
*/
const calculateMovementTimings = (leftBoxerLeadingSide, rightBoxerLeadingSide, winner) => {
  let movementTimings = [];

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
      // function for choosing movement type
      const chooseMovementType = (leadingSide) => {
        let movementType;

        let chance = Math.random();

        // probe movement
        if (chance < duelParameters.chanceOfProbeMovement) {
          movementType = 'probe';
        }

        // switch leading side movement
        else if (
          chance <
          duelParameters.chanceOfProbeMovement + duelParameters.chanceOfSwitchLeadingSideMovement
        ) {
          // additional check for switching leading side
          // so the boxers won't switch them simultaneously
          chance = Math.random();

          // pushing switch leading side movement
          if (chance < 0.5) {
            // setting movementType
            movementType = 'switchLeadingSide';

            // updating leadingSide
            leadingSide = leadingSide === 'left' ? 'right' : 'left';
          }

          // pushing probe movement
          else {
            // setting movementType
            movementType = 'probe';
          }
        }

        // error
        else {
          movementType = 'probe';

          console.log("error: calculateMovementTimings (1)");
        }

        // returning movement type and leading side
        return {
          movementType,
          leadingSide,
        };
      };

      // choosing movement types
      const { movementType: leftBoxerMovementType, leadingSide: leftBoxerLeadingSide } =
        chooseMovementType(leftBoxerLeadingSide);
      const { movementType: rightBoxerMovementType, leadingSide: rightBoxerLeadingSide } =
        chooseMovementType(rightBoxerLeadingSide);

      // pushing new movement timing
      // calculating chances of missing for each boxer
      movementTimings.push({
        startTime: time,
        leftBoxer: {
          movementType: leftBoxerMovementType,
          leadingSide: leftBoxerLeadingSide,
          miss: true,
        },
        rightBoxer: {
          movementType: rightBoxerMovementType,
          leadingSide: rightBoxerLeadingSide,
          miss: true,
        },
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
      // function for choosing movement type
      const chooseMovementType = (leadingSide) => {
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

        // error
        else {
          movementType = 'defensive';

          console.log("error: calculateMovementTimings (2)");
        }

        // returning movement type and leading side
        return {
          movementType,
          leadingSide,
        };
      };

      // choosing movement types
      const { movementType: leftBoxerMovementType, leadingSide: leftBoxerLeadingSide } =
        chooseMovementType(leftBoxerLeadingSide);
      const { movementType: rightBoxerMovementType, leadingSide: rightBoxerLeadingSide } =
        chooseMovementType(rightBoxerLeadingSide);

      // pushing new movement timing
      // calculating chances of missing for each boxer
      movementTimings.push({
        startTime: time,
        leftBoxer: {
          movementType: leftBoxerMovementType,
          leadingSide: leftBoxerLeadingSide,
          miss: Math.random() < duelParameters.chanceOfMiss,
        },
        rightBoxer: {
          movementType: rightBoxerMovementType,
          leadingSide: rightBoxerLeadingSide,
          miss: Math.random() < duelParameters.chanceOfMiss,
        },
      });

      // update current time with value big enough for the movement
      const randomMultiplier = Math.random() * duelParameters.attackRestDurationCoefficient;
      time += duelParameters.movementDuration * (1.0 + randomMultiplier);
    }
  });

  // making sure the last offense is by winner
  movementTimings.push({
    startTime: time,
    leftBoxer: {
      movementType: winner === 'left' ? 'offensive' : 'defensive',
      leadingSide: leftBoxerLeadingSide,
      miss: winner === 'left' ? false : true,
    },
    rightBoxer: {
      movementType: winner === 'left' ? 'defensive' : 'offensive',
      leadingSide: rightBoxerLeadingSide,
      miss: winner === 'left' ? true : false,
    },
  });

  return movementTimings;
};

export default calculateMovementTimings;
