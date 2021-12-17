/** @module containers/Game/services/algorithms/calculateDuelScenario/calculateMoveTimings */

import calculateAttackIntervals from "./calculateAttackIntervals";

import duelParameters from "../../constants/duelParameters";

/**
  @summary Calculates move timings
  @description Contains random.
  @param leftBoxerLeadingSide
  @param rightBoxerLeadingSide
  @param winner
  @returns the list of objects that contains startTime, winnerMoveType, winnerLeadingSide and loserLeadingSide
*/
const calculateMoveTimings = (
  leftBoxerLeadingSide,
  rightBoxerLeadingSide,
  winner
) => {
  let moveTimings = [];

  let winnerLeadingSide =
    winner === "left" ? leftBoxerLeadingSide : rightBoxerLeadingSide;
  let loserLeadingSide =
    winner === "left" ? rightBoxerLeadingSide : leftBoxerLeadingSide;

  const attackIntervals = calculateAttackIntervals();

  let time = 0;
  attackIntervals.forEach((attackInterval) => {
    while (time < attackInterval.startTime) {
      moveTimings.push({
        startTime: time,
        winnerMoveType: "probe",
        winnerLeadingSide: winnerLeadingSide,
        loserLeadingSide: loserLeadingSide,
      });

      const randomMultiplier =
        duelParameters.probeRestDurationCoefficient * Math.random();
      time += duelParameters.moveDuration * (1.0 + randomMultiplier);
    }

    const endTime = attackInterval.startTime + attackInterval.duration;
    const reactionTime =
      duelParameters.reactionTimeCoefficient * duelParameters.moveDuration;
    while (time + reactionTime <= endTime) {
      let moveType;

      let chance = Math.random();
      if (chance < duelParameters.chanceOfOffensiveMove) {
        moveType = "offensive";
      } else if (
        chance <
        duelParameters.chanceOfOffensiveMove +
          duelParameters.chanceOfDefensiveMove
      ) {
        moveType = "defensive";
      } else if (
        chance <
        duelParameters.chanceOfOffensiveMove +
          duelParameters.chanceOfDefensiveMove +
          duelParameters.chanceOfProbeMove
      ) {
        moveType = "probe";
      } else {
        chance = Math.random();
        if (chance < 0.5) {
          moveType = "switchLeadingSide-winner";
          if (winnerLeadingSide === "left") {
            winnerLeadingSide = "right";
          } else {
            winnerLeadingSide = "left";
          }
        } else {
          moveType = "switchLeadingSide-loser";
          if (loserLeadingSide === "left") {
            loserLeadingSide = "right";
          } else {
            loserLeadingSide = "left";
          }
        }
      }

      moveTimings.push({
        startTime: time,
        winnerMoveType: moveType,
        winnerLeadingSide,
        loserLeadingSide,
      });

      const randomMultiplier =
        duelParameters.attackRestDurationCoefficient * Math.random();
      time += duelParameters.moveDuration * (1.0 + randomMultiplier);
    }
  });
  moveTimings.push({
    startTime: time,
    winnerMoveType: "offensive",
    winnerLeadingSide: winnerLeadingSide,
    loserLeadingSide: loserLeadingSide,
  });

  return moveTimings;
};

export default calculateMoveTimings;
