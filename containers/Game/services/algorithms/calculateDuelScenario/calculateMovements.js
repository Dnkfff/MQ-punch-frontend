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
  @summary Pushes specified movement into movements list with flag of miss
  based on chances and random (only for the upper body)
  @param params
  @param params.movements movements list
  @param params.movement movement object
  @param params.movementTimingStartTime movement start time
  @param params.miss if the attack or defence is missed
  @param params.health loss of health
*/
const pushTheMovement = ({
  movements,
  movement,
  movementTimingStartTime,
  miss,
  health,
}) => {
  // calculating reaction time with value big enough for the movement
  const randomMultiplier = Math.random() * 0.5 + 0.5;
  const reactionTime =
    duelParameters.reactionTimeCoefficient *
    duelParameters.movementDuration *
    randomMultiplier;

  // pushing new movement
  movements.push({
    startTime: movementTimingStartTime + reactionTime,
    movement,
    miss,
    health,
  });
};

/**
  @summary Changes upperBodyMovementName according to leadingSide
  @param upperBodyMovementName name of the movement for the upper body
  @param leadingSide boxer leading side
*/
const applyLeadingSide = (upperBodyMovementName, leadingSide) => {
  // if the model is mirrored (normal is "right")
  if (leadingSide === "left") {
    // swap "left" with "right" and vice versa if needed
    if (upperBodyMovementName.includes("left")) {
      upperBodyMovementName.replace("left", "right");
    } else {
      upperBodyMovementName.replace("right", "left");
    }
  }
};

/**
  @summary Generates and pushes probe movement into movements list
  based on chances and random
  @param params
  @param params.movements movements list
  @param params.movementTimingStartTime movement timing start time
  @param params.leadingSide boxer leading side
*/
const pushProbeMovement = ({
  movements,
  movementTimingStartTime,
  leadingSide,
}) => {
  let lowerBodyMovementName, upperBodyMovementName;

  // getting random probe movement from the list
  // with leading side taken into account
  let randomIndex = Math.floor(Math.random() * probeAnimationNames.length);
  upperBodyMovementName = probeAnimationNames[randomIndex];
  applyLeadingSide(upperBodyMovementName, leadingSide);

  // getting random lower body movement from the list
  // according to the upper body movement
  randomIndex = Math.floor(
    Math.random() * lowerAnimationNames[upperBodyMovementName].length
  );
  lowerBodyMovementName =
    lowerAnimationNames[upperBodyMovementName][randomIndex];

  // packing movements for different body parts into one object
  const movement = {
    lower: lowerBodyMovementName,
    upper: upperBodyMovementName,
  };

  // pushing the movement
  pushTheMovement({
    movements,
    movement,
    movementTimingStartTime,
    miss: false,
    health: 0.0,
  });
};

/**
  @summary Pushes deceptive attack movement into movements list
  based on chances and random
  @param params
  @param params.movements movements list
  @param params.movementTimingStartTime movement timing start time
  @param params.leadingSide boxer leading side
  @param params.miss if the attack or defence is missed
*/
const pushDeceptiveAttackMovement = ({
  movements,
  movementTimingStartTime,
  leadingSide,
  miss,
}) => {
  let lowerBodyMovementName, upperBodyMovementName;

  // getting random deceptive attack movement from the list
  // with leading side taken into account
  let randomIndex = Math.floor(
    Math.random() * offensiveAnimationNames.deceptiveAttack.length
  );
  upperBodyMovementName = offensiveAnimationNames.deceptiveAttack[randomIndex];
  applyLeadingSide(upperBodyMovementName, leadingSide);

  // getting random lower body movement from the list
  // according to the upper body movement
  randomIndex = Math.floor(
    Math.random() * lowerAnimationNames[upperBodyMovementName].length
  );
  lowerBodyMovementName =
    lowerAnimationNames[upperBodyMovementName][randomIndex];

  // pushing the movement
  // bypassing general pushTheMovement function
  // so it will be placed between previous and actual current movement
  movements.push({
    startTime: movementTimingStartTime,
    movement: {
      lower: lowerBodyMovementName,
      upper: upperBodyMovementName,
    },
    miss,
    health: 0.0,
  });

  // returning the upper body movement name
  // so it can be used in pushDeceptiveDefenseMovement function
  return upperBodyMovementName;
};

/**
  @summary Pushes offensive movement into movements list
  based on chances and random
  @param params
  @param params.movements movements list
  @param params.movementTimingStartTime movement timing start time
  @param params.leadingSide boxer leading side
  @param params.miss if the attack or defence is missed
  @param params.chancesOfMovements an object with chances of each movement
*/
const pushOffensiveMovement = ({
  movements,
  movementTimingStartTime,
  leadingSide,
  miss,
  chancesOfMovements,
}) => {
  let lowerBodyMovementName, upperBodyMovementName;

  let type, deceptiveAttackMovementName, health;

  // choosing the attack movement type
  const randomChance = Math.random();

  // brute force attack
  if (randomChance < chancesOfMovements.offensive.chanceOfBruteForceAttack) {
    // getting random brute force attack movement from the list
    const randomIndex = Math.floor(
      Math.random() * offensiveAnimationNames.bruteForceAttack.length
    );
    upperBodyMovementName =
      offensiveAnimationNames.bruteForceAttack[randomIndex];

    type = "bruteForceAttack";

    health = duelParameters.bruteForceAttackHealthLoss;
  }

  // deceptive attack
  else if (
    randomChance <
    chancesOfMovements.offensive.chanceOfBruteForceAttack +
      chancesOfMovements.offensive.chanceOfDeceptiveAttack
  ) {
    // getting random deceptive attack movement from the list
    const randomIndex = Math.floor(
      Math.random() * offensiveAnimationNames.deceptiveAttack.length
    );
    upperBodyMovementName =
      offensiveAnimationNames.deceptiveAttack[randomIndex];

    type = "deceptiveAttack";

    health = duelParameters.deceptiveAttackHealthLoss;

    // generating and pushing a deceptive attack movement
    // bypassing general pushTheMovement function
    // so it will be placed between previous and actual current movement
    deceptiveAttackMovementName = pushDeceptiveAttackMovement({
      movements,
      movementTimingStartTime,
      leadingSide,
      miss,
    });
  }

  // counter attack
  else {
    // getting random counter attack movement from the list
    const randomIndex = Math.floor(
      Math.random() * offensiveAnimationNames.counterAttack.length
    );
    upperBodyMovementName = offensiveAnimationNames.counterAttack[randomIndex];

    type = "counterAttack";

    health = duelParameters.counterAttackHealthLoss;
  }

  // taking into account leading side
  applyLeadingSide(upperBodyMovementName, leadingSide);

  // getting random lower body movement from the list
  // according to the upper body movement
  const randomIndex = Math.floor(
    Math.random() * lowerAnimationNames[upperBodyMovementName].length
  );
  lowerBodyMovementName =
    lowerAnimationNames[upperBodyMovementName][randomIndex];

  // packing movements for different body parts into one object
  const movement = {
    lower: lowerBodyMovementName,
    upper: upperBodyMovementName,
  };

  // pushing the movement
  pushTheMovement({
    movements,
    movement,
    movementTimingStartTime,
    miss,
    health,
  });

  // returning the upper body movement name
  // so it can be used in pushDefensiveMovement function
  return {
    name: upperBodyMovementName,
    deceptiveName: deceptiveAttackMovementName,
    type,
  };
};

/**
  @summary Pushes deceptive defence movement into movements list
  based on chances and random
  @param params
  @param params.movements movements list
  @param params.movementTimingStartTime movement timing start time
  @param params.leadingSide boxer leading side
  @param params.miss if the attack or defence is missed
  @param params.chancesOfMovements an object with chances of each movement
  @param params.offensiveMovement offensive movement name
*/
const pushDeceptiveDefenseMovement = ({
  movements,
  movementTimingStartTime,
  leadingSide,
  miss,
  chancesOfMovements,
  offensiveMovement,
}) => {
  let lowerBodyMovementName, upperBodyMovementName;

  // choosing the defense movement type
  const randomChance = Math.random();

  // block
  if (randomChance < chancesOfMovements.defensive.chanceOfBlock) {
    // getting random block defense movement from the list
    const randomIndex = Math.floor(
      Math.random() *
        defensiveAnimationNames[offensiveMovement.name].block.length
    );
    upperBodyMovementName =
      defensiveAnimationNames[offensiveMovement.name].block[randomIndex];
  }

  // dodge
  else {
    // getting random dodge defense movement from the list
    const randomIndex = Math.floor(
      Math.random() *
        defensiveAnimationNames[offensiveMovement.name].dodge.length
    );
    upperBodyMovementName =
      defensiveAnimationNames[offensiveMovement.name].dodge[randomIndex];
  }

  // taking into account leading side
  applyLeadingSide(upperBodyMovementName, leadingSide);

  // getting random lower body movement from the list
  // according to the upper body movement
  const randomIndex = Math.floor(
    Math.random() * lowerAnimationNames[upperBodyMovementName].length
  );
  lowerBodyMovementName =
    lowerAnimationNames[upperBodyMovementName][randomIndex];

  // pushing the movement
  // bypassing general pushTheMovement function
  // so it will be placed between previous and actual current movement
  movements.push({
    startTime: movementTimingStartTime,
    movement: {
      lower: lowerBodyMovementName,
      upper: upperBodyMovementName,
    },
    miss,
    health: 0.0,
  });
};

/**
  @summary Pushes defensive movement into movements list
  based on chances and random
  @param params
  @param params.movements movements list
  @param params.movementTimingStartTime movement timing start time
  @param params.leadingSide boxer leading side
  @param params.miss if the attack or defence is missed
  @param params.chancesOfMovements an object with chances of each movement
  @param params.offensiveMovement offensive movement name
*/
const pushDefensiveMovement = ({
  movements,
  movementTimingStartTime,
  leadingSide,
  miss,
  chancesOfMovements,
  offensiveMovement,
}) => {
  let lowerBodyMovementName, upperBodyMovementName;

  let health;

  // brute force attack
  if (offensiveMovement.type === "bruteForceAttack") {
    // choosing the defense movement type
    const randomChance = Math.random();

    // block
    if (randomChance < chancesOfMovements.defensive.chanceOfBlock) {
      // getting random block defense movement from the list
      const randomIndex = Math.floor(
        Math.random() *
          defensiveAnimationNames[offensiveMovement.name].block.length
      );
      upperBodyMovementName =
        defensiveAnimationNames[offensiveMovement.name].block[randomIndex];

      // calculating health loss
      health = !miss
        ? duelParameters.bruteForceAttackDefenseBlockSuccessHealthLoss
        : duelParameters.bruteForceAttackDefenseFailHealthLoss;
    }

    // dodge
    else {
      // getting random dodge defense movement from the list
      const randomIndex = Math.floor(
        Math.random() *
          defensiveAnimationNames[offensiveMovement.name].dodge.length
      );
      upperBodyMovementName =
        defensiveAnimationNames[offensiveMovement.name].dodge[randomIndex];

      // calculating health loss
      health = !miss
        ? duelParameters.bruteForceAttackDefenseDodgeSuccessHealthLoss
        : duelParameters.bruteForceAttackDefenseFailHealthLoss;
    }
  }

  // deceptive attack
  else if (offensiveMovement.type === "deceptiveAttack") {
    // generating and pushing a deceptive defense movement
    // bypassing general pushTheMovement function
    // so it will be placed between previous and actual current movement
    pushDeceptiveDefenseMovement({
      movements,
      movementTimingStartTime,
      leadingSide,
      miss,
      chancesOfMovements,
      offensiveMovement,
    });

    // choosing the defense movement type
    const randomChance = Math.random();

    // block
    if (randomChance < chancesOfMovements.defensive.chanceOfBlock) {
      // getting random block defense movement from the list
      const randomIndex = Math.floor(
        Math.random() *
          defensiveAnimationNames[offensiveMovement.name].block.length
      );
      upperBodyMovementName =
        defensiveAnimationNames[offensiveMovement.name].block[randomIndex];

      // calculating health loss
      health = !miss
        ? duelParameters.deceptiveAttackDefenseBlockSuccessHealthLoss
        : duelParameters.deceptiveAttackDefenseFailHealthLoss;
    }

    // dodge
    else {
      // getting random dodge defense movement from the list
      const randomIndex = Math.floor(
        Math.random() *
          defensiveAnimationNames[offensiveMovement.name].dodge.length
      );
      upperBodyMovementName =
        defensiveAnimationNames[offensiveMovement.name].dodge[randomIndex];

      // calculating health loss
      health = !miss
        ? duelParameters.deceptiveAttackDefenseDodgeSuccessHealthLoss
        : duelParameters.deceptiveAttackDefenseFailHealthLoss;
    }
  }

  // counter attack
  else {
    // getting random brute force attack movement from the list
    // because when type of offender attack is counter attack defender must hit
    // so offender hits with "counter" attack
    // and defender "defenses" with brute force one
    const randomIndex = Math.floor(
      Math.random() * offensiveAnimationNames.bruteForceAttack.length
    );
    upperBodyMovementName =
      offensiveAnimationNames.bruteForceAttack[randomIndex];

    // calculating health loss
    health = !miss
      ? duelParameters.counterAttackDefenseSuccessHealthLoss
      : duelParameters.counterAttackDefenseFailHealthLoss;
  }

  // taking into account leading side
  applyLeadingSide(upperBodyMovementName, leadingSide);

  // getting random lower body movement from the list
  // according to the upper body movement
  const randomIndex = Math.floor(
    Math.random() * lowerAnimationNames[upperBodyMovementName].length
  );
  lowerBodyMovementName =
    lowerAnimationNames[upperBodyMovementName][randomIndex];

  // if offensive movement is missed there is no damage to defender
  if (offensiveMovement.miss) {
    health = 0.0;
  }

  // packing movements for different body parts into one object
  const movement = {
    lower: lowerBodyMovementName,
    upper: upperBodyMovementName,
  };

  // pushing the movement
  pushTheMovement({
    movements,
    movement,
    movementTimingStartTime,
    miss,
    health,
  });
};

/**
  @summary Pushes switch leading side movement into movements list
  @param params
  @param params.movements movements list
  @param params.movementTimingStartTime movement timing start time
*/
const pushSwitchLeadingSideMovement = ({
  movements,
  movementTimingStartTime,
}) => {
  // packing movement for the whole body into an object
  const movement = {
    whole: switchLeadingSideAnimationName,
  };

  // pushing the movement
  pushTheMovement({
    movements,
    movement,
    movementTimingStartTime,
    miss: false,
    health: 0.0,
  });
};

/**
  @summary Transforms and saturates health levels in movements lists
  @param winnerMovements winner movements list
  @param loserMovements loser movements list
*/
const saturateHealthLevels = (winnerMovements, loserMovements) => {
  let currentHealth = 0.0,
    currentHealthReserve;
  const calculateHealth = (movement) => {
    currentHealth += movement.health;
    movement.health = currentHealth;
  };

  winnerMovements.forEach(calculateHealth);
  currentHealthReserve = currentHealth;
  currentHealth = 0.0;
  loserMovements.forEach(calculateHealth);

  const maxHealtLoss = Math.max(currentHealth, currentHealthReserve);

  const saturateHealth = (movement) => {
    movement.health = 1.0 - movement.health / maxHealtLoss;
  };

  winnerMovements.forEach(saturateHealth);
  loserMovements.forEach(saturateHealth);
};

/**
  @summary Calculates movements for each boxer
  @param params
  @param params.boxersChancesOfMovements an object with chances of each
  movement for each boxer
  @param params.boxersLeadingSides an object with leading sides of each boxer
  @param params.winner winner of the duel
  @returns an object with leftBoxerMovements, rightBoxerMovements and winner
*/
const calculateMovements = (
  boxersChancesOfMovements,
  boxersLeadingSides,
  winner
) => {
  // unpacking chances of movements and leading sides
  const { leftBoxerChancesOfMovements, rightBoxerChancesOfMovements } =
    boxersChancesOfMovements;
  const { leftBoxerLeadingSide, rightBoxerLeadingSide } = boxersLeadingSides;

  let winnerMovements = [],
    loserMovements = [];

  // calculating movement timings for the winner
  const movementTimings = calculateMovementTimings(
    leftBoxerLeadingSide,
    rightBoxerLeadingSide,
    winner
  );

  // for each movement timing
  movementTimings.forEach((movementTiming) => {
    // probe movement
    if (movementTiming.winnerMovementType === "probe") {
      pushProbeMovement({
        movements: winnerMovements,
        movementTimingStartTime: movementTiming.startTime,
        leadingSide: movementTiming.winnerLeadingSide,
      });
      pushProbeMovement({
        movements: loserMovements,
        movementTimingStartTime: movementTiming.startTime,
        leadingSide: movementTiming.loserLeadingSide,
      });
    }

    // offensive movement
    else if (movementTiming.winnerMovementType === "offensive") {
      // the winner is the left boxer
      if (winner === "left") {
        // generating and pushing an offensive movement for the winner (the left boxer)
        const offensiveMovement = pushOffensiveMovement({
          movements: winnerMovements,
          movementTimingStartTime: movementTiming.startTime,
          leadingSide: movementTiming.winnerLeadingSide,
          miss: movementTiming.winnerMiss,
          chancesOfMovements: leftBoxerChancesOfMovements,
        });

        // generating and pushing a defensive movement for the loser (the right boxer)
        pushDefensiveMovement({
          movements: loserMovements,
          movementTimingStartTime: movementTiming.startTime,
          leadingSide: movementTiming.loserLeadingSide,
          miss: movementTiming.loserMiss,
          chancesOfMovements: rightBoxerChancesOfMovements,
          offensiveMovement,
        });
      }

      // the winner is the right boxer
      else {
        // generating and pushing an offensive movement for the winner (the right boxer)
        const offensiveMovement = pushOffensiveMovement({
          movements: winnerMovements,
          movementTimingStartTime: movementTiming.startTime,
          leadingSide: movementTiming.winnerLeadingSide,
          miss: movementTiming.winnerMiss,
          chancesOfMovements: rightBoxerChancesOfMovements,
        });

        // generating and pushing a defensive movement for the loser (the left boxer)
        pushDefensiveMovement({
          movements: loserMovements,
          movementTimingStartTime: movementTiming.startTime,
          leadingSide: movementTiming.loserLeadingSide,
          miss: movementTiming.loserMiss,
          chancesOfMovements: leftBoxerChancesOfMovements,
          offensiveMovement,
        });
      }
    }

    // defensive movement
    else if (movementTiming.winnerMovementType === "defensive") {
      // the winner is the left boxer
      if (winner === "left") {
        // generating and pushing an offensive movement for the loser (the right boxer)
        const offensiveMovement = pushOffensiveMovement({
          movements: loserMovements,
          movementTimingStartTime: movementTiming.startTime,
          leadingSide: movementTiming.loserLeadingSide,
          miss: movementTiming.loserMiss,
          chancesOfMovements: rightBoxerChancesOfMovements,
        });

        // generating and pushing a defensive movement for the winner (the left boxer)
        pushDefensiveMovement({
          movements: winnerMovements,
          movementTimingStartTime: movementTiming.startTime,
          leadingSide: movementTiming.winnerLeadingSide,
          miss: movementTiming.winnerMiss,
          chancesOfMovements: leftBoxerChancesOfMovements,
          offensiveMovement,
        });
      }

      // the winner is the right boxer
      else {
        // generating and pushing an offensive movement for the loser (the left boxer)
        const offensiveMovement = pushOffensiveMovement({
          movements: loserMovements,
          movementTimingStartTime: movementTiming.startTime,
          leadingSide: movementTiming.loserLeadingSide,
          miss: movementTiming.loserMiss,
          chancesOfMovements: leftBoxerChancesOfMovements,
        });

        // generating and pushing a defensive movement for the winner (the right boxer)
        pushDefensiveMovement({
          movements: winnerMovements,
          movementTimingStartTime: movementTiming.startTime,
          leadingSide: movementTiming.winnerLeadingSide,
          miss: movementTiming.winnerMiss,
          chancesOfMovements: rightBoxerChancesOfMovements,
          offensiveMovement,
        });
      }
    }

    // switch leading side movement
    else {
      // winner is changing his leading side
      if (movementTiming.winnerMovementType === "switchLeadingSide-winner") {
        // generating and pushing a switch leading side movement for the winner
        pushSwitchLeadingSideMovement({
          movements: winnerMovements,
          movementTimingStartTime: movementTiming.startTime,
        });

        // generating and pushing a probe movement for the loser
        pushProbeMovement({
          movements: loserMovements,
          movementTimingStartTime: movementTiming.startTime,
          leadingSide: movementTiming.loserLeadingSide,
        });
      }

      // loser is changing his leading side
      else {
        // generating and pushing a switch leading side movement for the loser
        pushSwitchLeadingSideMovement({
          movements: loserMovements,
          movementTimingStartTime: movementTiming.startTime,
        });

        // generating and pushing a probe movement for the winner
        pushProbeMovement({
          movements: winnerMovements,
          movementTimingStartTime: movementTiming.startTime,
          leadingSide: movementTiming.winnerLeadingSide,
        });
      }
    }
  });

  // saturating health levels
  // so both boxers have health level equal to one at the beginning,
  // loser has zero and winner has non-zero value at the end
  saturateHealthLevels(winnerMovements, loserMovements);

  // "translating" winner-loser to left-right
  const leftBoxerMovements =
    winner === "left" ? winnerMovements : loserMovements;
  const rightBoxerMovements =
    winner === "left" ? loserMovements : winnerMovements;

  return {
    leftBoxerMovements,
    rightBoxerMovements,
    winner,
  };
};

export default calculateMovements;
