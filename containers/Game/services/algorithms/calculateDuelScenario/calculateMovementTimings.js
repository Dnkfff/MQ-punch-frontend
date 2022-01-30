/** @module containers/Game/services/algorithms/calculateDuelScenario/calculateMovementTimings */

import calculateAttackIntervals from "./calculateAttackIntervals";

import duelParameters from "../../constants/duelParameters";

/**
  @summary Calculates movement timings based on chances and random
  @param leftBoxerLeadingSide
  @param rightBoxerLeadingSide
  @param winner
  @returns the list of objects that contains startTime, winnerMovementType, winnerLeadingSide and loserLeadingSide
*/
const calculateMovementTimings = (
  leftBoxerLeadingSide,
  rightBoxerLeadingSide,
  winner
) => {
  let movementTimings = [];

  let winnerLeadingSide =
    winner === "left" ? leftBoxerLeadingSide : rightBoxerLeadingSide;
  let loserLeadingSide =
    winner === "left" ? rightBoxerLeadingSide : leftBoxerLeadingSide;

  const attackIntervals = calculateAttackIntervals();

  let time = 0;
  attackIntervals.forEach((attackInterval) => {
    while (time < attackInterval.startTime) {
      movementTimings.push({
        startTime: time,
        winnerMovementType: "probe",
        winnerLeadingSide: winnerLeadingSide,
        loserLeadingSide: loserLeadingSide,
      });

      const randomMultiplier =
        duelParameters.probeRestDurationCoefficient * Math.random();
      time += duelParameters.movementDuration * (1.0 + randomMultiplier);
    }

    const endTime = attackInterval.startTime + attackInterval.duration;
    const reactionTime =
      duelParameters.reactionTimeCoefficient * duelParameters.movementDuration;
    while (time + reactionTime <= endTime) {
      let movementType;

      let chance = Math.random();
      if (chance < duelParameters.chanceOfOffensiveMovement) {
        movementType = "offensive";
      } else if (
        chance <
        duelParameters.chanceOfOffensiveMovement +
          duelParameters.chanceOfDefensiveMovement
      ) {
        movementType = "defensive";
      } else if (
        chance <
        duelParameters.chanceOfOffensiveMovement +
          duelParameters.chanceOfDefensiveMovement +
          duelParameters.chanceOfProbeMovement
      ) {
        movementType = "probe";
      } else {
        chance = Math.random();
        if (chance < 0.5) {
          movementType = "switchLeadingSide-winner";
          if (winnerLeadingSide === "left") {
            winnerLeadingSide = "right";
          } else {
            winnerLeadingSide = "left";
          }
        } else {
          movementType = "switchLeadingSide-loser";
          if (loserLeadingSide === "left") {
            loserLeadingSide = "right";
          } else {
            loserLeadingSide = "left";
          }
        }
      }

      movementTimings.push({
        startTime: time,
        winnerMovementType: movementType,
        winnerLeadingSide,
        loserLeadingSide,
      });

      const randomMultiplier =
        duelParameters.attackRestDurationCoefficient * Math.random();
      time += duelParameters.movementDuration * (1.0 + randomMultiplier);
    }
  });
  movementTimings.push({
    startTime: time,
    winnerMovementType: "offensive",
    winnerLeadingSide: winnerLeadingSide,
    loserLeadingSide: loserLeadingSide,
  });

  return movementTimings;
};

export default calculateMovementTimings;
