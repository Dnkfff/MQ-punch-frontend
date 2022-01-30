/** @module containers/Game/services/algorithms/calculateDuelScenario/calculateMovements */

import calculateMovementTimings from "./calculateMovementTimings";

import duelParameters from "../../constants/duelParameters";
import {
  probeAnimationNames,
  offensiveAnimationNames,
  defensiveAnimationNames,
  lowerAnimationNames,
  switchLeadingSideAnimationName,
} from "../../constants/duelAnimationNames";

/**
  @summary Pushes specified movement into movements list with flag of miss based on chances and random (only for the upper body)
  @param movements movements list
  @param movement movement object
  @param movementTimingStartTime movement start time
  @param miss if the attack or defence is missed
*/
const pushTheMovement = (
  movements,
  movement,
  movementTimingStartTime,
  miss
) => {
  const randomMultiplier = 0.5 + 0.5 * Math.random();
  const reactionTime =
    duelParameters.reactionTimeCoefficient *
    duelParameters.movementDuration *
    randomMultiplier;

  movements.push({
    startTime: movementTimingStartTime + reactionTime,
    movement,
    miss,
  });
};

/**
  @summary Changes upperBodyMovementName according to leadinSide
  @param upperBodyMovementName
  @param leadingSide
*/
const applyLeadingSide = (upperBodyMovementName, leadingSide) => {
  if (leadingSide === "left") {
    if (upperBodyMovementName.includes("left")) {
      upperBodyMovementName.replace("left", "right");
    } else {
      upperBodyMovementName.replace("right", "left");
    }
  }
};

/**
  @summary Pushes probe movement into movements list based on chances and random
  @param params
  @param params.movementTimingStartTime movement timing start time
  @param params.movements movements list
  @param params.leadingSide
*/
const pushProbeMovement = ({
  movementTimingStartTime,
  movements,
  leadingSide,
}) => {
  let lowerBodyMovementName, upperBodyMovementName;

  let randomIndex = Math.floor(Math.random() * probeAnimationNames.length);
  upperBodyMovementName = probeAnimationNames[randomIndex];
  applyLeadingSide(upperBodyMovementName, leadingSide);

  randomIndex = Math.floor(
    Math.random() * lowerAnimationNames[upperBodyMovementName].length
  );
  lowerBodyMovementName =
    lowerAnimationNames[upperBodyMovementName][randomIndex];

  const movement = {
    lower: lowerBodyMovementName,
    upper: upperBodyMovementName,
  };
  pushTheMovement(movements, movement, movementTimingStartTime, false);
};

/**
  @summary Pushes deceptive attack movement into movements list based on chances and random
  @param params
  @param params.movementTimingStartTime movement timing start time
  @param params.movements movements list
  @param params.leadingSide
*/
const pushDeceptiveAttackMovement = ({
  movementTimingStartTime,
  movements,
  leadingSide,
}) => {
  let lowerBodyMovementName, upperBodyMovementName;

  let randomIndex = Math.floor(
    Math.random() * offensiveAnimationNames.deceptiveAttack.length
  );
  upperBodyMovementName = offensiveAnimationNames.deceptiveAttack[randomIndex];
  applyLeadingSide(upperBodyMovementName, leadingSide);

  randomIndex = Math.floor(
    Math.random() * lowerAnimationNames[upperBodyMovementName].length
  );
  lowerBodyMovementName =
    lowerAnimationNames[upperBodyMovementName][randomIndex];

  movements.push({
    startTime: movementTimingStartTime,
    movement: {
      lower: lowerBodyMovementName,
      upper: upperBodyMovementName,
    },
  });

  return upperBodyMovementName;
};

/**
  @summary Pushes offensive movement into movements list based on chances and random
  @param params
  @param params.movementTimingStartTime movement timing start time
  @param params.movements movements list
  @param params.leadingSide
  @param params.chancesOfMovements an object with chances of each movement
*/
const pushOffensiveMovement = ({
  movementTimingStartTime,
  movements,
  leadingSide,
  chancesOfMovements,
}) => {
  let lowerBodyMovementName, upperBodyMovementName;

  let type, deceptiveAttackMovementName;

  const randomChance = Math.random();
  if (randomChance < chancesOfMovements.offensive.chanceOfBruteForceAttack) {
    const randomIndex = Math.floor(
      Math.random() * offensiveAnimationNames.bruteForceAttack.length
    );
    upperBodyMovementName =
      offensiveAnimationNames.bruteForceAttack[randomIndex];
    type = "bruteForceAttack";
  } else if (
    randomChance <
    chancesOfMovements.offensive.chanceOfBruteForceAttack +
      chancesOfMovements.offensive.chanceOfDeceptiveAttack
  ) {
    const randomIndex = Math.floor(
      Math.random() * offensiveAnimationNames.deceptiveAttack.length
    );
    upperBodyMovementName =
      offensiveAnimationNames.deceptiveAttack[randomIndex];
    type = "deceptiveAttack";
    deceptiveAttackMovementName = pushDeceptiveAttackMovement({
      movementTimingStartTime,
      movements,
      leadingSide,
    });
  } else {
    const randomIndex = Math.floor(
      Math.random() * offensiveAnimationNames.counterAttack.length
    );
    upperBodyMovementName = offensiveAnimationNames.counterAttack[randomIndex];
    type = "counterAttack";
  }
  applyLeadingSide(upperBodyMovementName, leadingSide);

  const randomIndex = Math.floor(
    Math.random() * lowerAnimationNames[upperBodyMovementName].length
  );
  lowerBodyMovementName =
    lowerAnimationNames[upperBodyMovementName][randomIndex];

  const movement = {
    lower: lowerBodyMovementName,
    upper: upperBodyMovementName,
  };
  pushTheMovement(
    movements,
    movement,
    movementTimingStartTime,
    Math.random() < duelParameters.chanceOfMiss
  );

  return {
    name: upperBodyMovementName,
    deceptiveName: deceptiveAttackMovementName,
    type,
  };
};

/**
  @summary Pushes deceptive defence movement into movements list based on chances and random
  @param params
  @param params.movementTimingStartTime movement timing start time
  @param params.movements movements list
  @param params.leadingSide
  @param params.chancesOfMovements an object with chances of each movement
  @param params.offensiveMovement offensive movement name
*/
const pushDeceptiveDefenseMovement = ({
  movementTimingStartTime,
  movements,
  leadingSide,
  chancesOfMovements,
  offensiveMovement,
}) => {
  let lowerBodyMovementName, upperBodyMovementName;

  const randomChance = Math.random();
  if (randomChance < chancesOfMovements.defensive.chanceOfBlock) {
    const randomIndex = Math.floor(
      Math.random() *
        defensiveAnimationNames[offensiveMovement.name].block.length
    );
    upperBodyMovementName =
      defensiveAnimationNames[offensiveMovement.name].block[randomIndex];
  } else {
    const randomIndex = Math.floor(
      Math.random() *
        defensiveAnimationNames[offensiveMovement.name].dodge.length
    );
    upperBodyMovementName =
      defensiveAnimationNames[offensiveMovement.name].dodge[randomIndex];
  }
  applyLeadingSide(upperBodyMovementName, leadingSide);

  const randomIndex = Math.floor(
    Math.random() * lowerAnimationNames[upperBodyMovementName].length
  );
  lowerBodyMovementName =
    lowerAnimationNames[upperBodyMovementName][randomIndex];

  movements.push({
    startTime: movementTimingStartTime,
    movement: {
      lower: lowerBodyMovementName,
      upper: upperBodyMovementName,
    },
  });
};

/**
  @summary Pushes defensive movement into movements list based on chances and random
  @param params
  @param params.movementTimingStartTime movement timing start time
  @param params.movements movements list
  @param params.leadingSide
  @param params.chancesOfMovements an object with chances of each movement
  @param params.offensiveMovement offensive movement name
*/
const pushDefensiveMovement = ({
  movementTimingStartTime,
  movements,
  leadingSide,
  chancesOfMovements,
  offensiveMovement,
}) => {
  let lowerBodyMovementName, upperBodyMovementName;

  if (offensiveMovement.type !== "counterAttack") {
    if (offensiveMovement.type === "deceptiveAttack") {
      const randomChance = Math.random();
      if (randomChance < duelParameters.chanceOfDeceptiveDefenseMovement) {
        pushDeceptiveDefenseMovement({
          movementTimingStartTime,
          movements,
          leadingSide,
          chancesOfMovements,
          offensiveMovement,
        });
      }
    }

    const randomChance = Math.random();
    if (randomChance < chancesOfMovements.defensive.chanceOfBlock) {
      const randomIndex = Math.floor(
        Math.random() *
          defensiveAnimationNames[offensiveMovement.name].block.length
      );
      upperBodyMovementName =
        defensiveAnimationNames[offensiveMovement.name].block[randomIndex];
    } else {
      const randomIndex = Math.floor(
        Math.random() *
          defensiveAnimationNames[offensiveMovement.name].dodge.length
      );
      upperBodyMovementName =
        defensiveAnimationNames[offensiveMovement.name].dodge[randomIndex];
    }
  } else {
    const randomIndex = Math.floor(
      Math.random() * offensiveAnimationNames.bruteForceAttack.length
    );
    upperBodyMovementName =
      offensiveAnimationNames.bruteForceAttack[randomIndex];
  }
  applyLeadingSide(upperBodyMovementName, leadingSide);

  const randomIndex = Math.floor(
    Math.random() * lowerAnimationNames[upperBodyMovementName].length
  );
  lowerBodyMovementName =
    lowerAnimationNames[upperBodyMovementName][randomIndex];

  const movement = {
    lower: lowerBodyMovementName,
    upper: upperBodyMovementName,
  };
  pushTheMovement(
    movements,
    movement,
    movementTimingStartTime,
    Math.random() < duelParameters.chanceOfMiss
  );
};

/**
  @summary Pushes switch leading side movement into movements list
  @param params
  @param params.movementTimingStartTime movement timing start time
  @param params.movements movements list
*/
const pushSwitchLeadingSideMovement = ({
  movementTimingStartTime,
  movements,
}) => {
  const movement = {
    whole: switchLeadingSideAnimationName,
  };
  pushTheMovement(movements, movement, movementTimingStartTime, false);
};

/**
  @summary Calculates movement timings for each boxer
  @param params
  @param params.boxersChancesOfMovements an object with chances of each movement for each boxer
  @param params.boxersLeadingSides an object with leading sides of each boxer
  @param params.winner winner of the duel
  @returns an object with leftBoxerMovements (object that contains startTime and movement),
  rightBoxerMovements and winner
*/
const calculateMovements = (
  boxersChancesOfMovements,
  boxersLeadingSides,
  winner
) => {
  const { leftBoxerChancesOfMovements, rightBoxerChancesOfMovements } =
    boxersChancesOfMovements;
  const { leftBoxerLeadingSide, rightBoxerLeadingSide } = boxersLeadingSides;

  let winnerMovements = [],
    loserMovements = [];

  const movementTimings = calculateMovementTimings(
    leftBoxerLeadingSide,
    rightBoxerLeadingSide,
    winner
  );

  movementTimings.forEach((movementTiming) => {
    const movementTimingStartTime = movementTiming.startTime;
    const leadingSide = movementTiming.loserLeadingSide;

    if (movementTiming.winnerMovementType === "probe") {
      pushProbeMovement({
        movementTimingStartTime,
        movements: winnerMovements,
      });
      pushProbeMovement({ movementTimingStartTime, movements: loserMovements });
    } else if (movementTiming.winnerMovementType === "offensive") {
      if (winner === "left") {
        const offensiveMovement = pushOffensiveMovement({
          movementTimingStartTime,
          movements: winnerMovements,
          leadingSide,
          chancesOfMovements: leftBoxerChancesOfMovements,
        });
        pushDefensiveMovement({
          movementTimingStartTime,
          movements: loserMovements,
          leadingSide,
          chancesOfMovements: rightBoxerChancesOfMovements,
          offensiveMovement,
        });
      } else {
        const offensiveMovement = pushOffensiveMovement({
          movementTimingStartTime,
          movements: winnerMovements,
          leadingSide,
          chancesOfMovements: rightBoxerChancesOfMovements,
        });
        pushDefensiveMovement({
          movementTimingStartTime,
          movements: loserMovements,
          leadingSide,
          chancesOfMovements: leftBoxerChancesOfMovements,
          offensiveMovement,
        });
      }
    } else if (movementTiming.winnerMovementType === "defensive") {
      if (winner === "left") {
        const offensiveMovement = pushOffensiveMovement({
          movementTimingStartTime,
          movements: loserMovements,
          leadingSide,
          chancesOfMovements: rightBoxerChancesOfMovements,
        });
        pushDefensiveMovement({
          movementTimingStartTime,
          movements: winnerMovements,
          leadingSide,
          chancesOfMovements: leftBoxerChancesOfMovements,
          offensiveMovement,
        });
      } else {
        const offensiveMovement = pushOffensiveMovement({
          movementTimingStartTime,
          movements: loserMovements,
          leadingSide,
          chancesOfMovements: leftBoxerChancesOfMovements,
        });
        pushDefensiveMovement({
          movementTimingStartTime,
          movements: winnerMovements,
          leadingSide,
          chancesOfMovements: rightBoxerChancesOfMovements,
          offensiveMovement,
        });
      }
    } else {
      if (movementTiming.winnerMovementType === "switchLeadingSide-winner") {
        pushSwitchLeadingSideMovement({
          movementTimingStartTime,
          movements: winnerMovements,
        });
        pushProbeMovement({
          movementTimingStartTime,
          movements: loserMovements,
        });
      } else {
        pushSwitchLeadingSideMovement({
          movementTimingStartTime,
          movements: loserMovements,
        });
        pushProbeMovement({
          movementTimingStartTime,
          movements: winnerMovements,
        });
      }
    }
  });

  return {
    leftBoxerMovements: winner === "left" ? winnerMovements : loserMovements,
    rightBoxerMovements: winner === "left" ? loserMovements : winnerMovements,
    winner,
  };
};

export default calculateMovements;
