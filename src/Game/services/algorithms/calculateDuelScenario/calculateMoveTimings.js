import calculateAttackIntervals from './calculateAttackIntervals';

import duelParameters from '../../constants/duelParameters';


const calculateMoveTimings = (leftBoxerLeadingSide, rightBoxerLeadingSide, winner) => {
  let moveTimings = [];

  let winnerLeadingSide = winner === 'left' ? leftBoxerLeadingSide : rightBoxerLeadingSide;
  let loserLeadingSide = winner === 'left' ? rightBoxerLeadingSide : leftBoxerLeadingSide;

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
      moveTimings.push({
        startTime: time,
        winnerMoveType: 'probe',
        winnerLeadingSide: winnerLeadingSide,
        loserLeadingSide: loserLeadingSide,
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
      if (chance < duelParameters.chanceOfOffensiveMove) {
        moveType = 'offensive';
      } else if (chance < duelParameters.chanceOfOffensiveMove + duelParameters.chanceOfDefensiveMove) {
        moveType = 'defensive';
      } else if (chance < duelParameters.chanceOfOffensiveMove + duelParameters.chanceOfDefensiveMove + duelParameters.chanceOfProbeMove) {
        moveType = 'probe';
      } else {
        chance = Math.random();
        if (chance < 0.5) {
          moveType = 'switchLeadingSide-winner';
          if (winnerLeadingSide === 'left') {
            winnerLeadingSide = 'right';
          } else {
            winnerLeadingSide = 'left';
          }
        } else {
          moveType = 'switchLeadingSide-loser';
          if (loserLeadingSide === 'left') {
            loserLeadingSide = 'right';
          } else {
            loserLeadingSide = 'left';
          }
        }
      }

      moveTimings.push({
        startTime: time,
        winnerMoveType: moveType,
        winnerLeadingSide: winnerLeadingSide,
        loserLeadingSide: loserLeadingSide,
      });

      randomMultiplier = duelParameters.attackRestDurationCoefficient * Math.random();
      time += duelParameters.moveDuration * (1.0 + randomMultiplier);
    }

    moveTimings.push({
      startTime: time,
      winnerMoveType: 'offensive',
      winnerLeadingSide: winnerLeadingSide,
      loserLeadingSide: loserLeadingSide,
    });
  });

  return moveTimings;
};

export default calculateMoveTimings;
