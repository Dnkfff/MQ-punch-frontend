/** @module containers/Game/services/algorithms/calculateDuelScenario/calculateMovements */

import calculateMovementTimings from './calculateMovementTimings';
import calculateHealthLevels from './calculateHealthLevels';

import duelParameters from '../../constants/duelParameters';
import {
  probeAnimationNames,
  offensiveAnimationNames,
  defensiveAnimationNames,
  missAnimationNames,
  lowerAnimationNames,
  switchLeadingSideAnimationName,
} from '../../constants/duelAnimationNames';

/**
  @summary Generates specified movement with startTime based on random
  @param params
  @param params.startTime movement start time
  @param params.type movement type
  @param params.name an object with lower, upper and whole body animation names
  @param params.miss if the attack or defense is missed
  @param params.reactionTimeMultiplier rection time multiplier for internal recursive use
  @returns new movement { startTime, type, name, miss }
*/
const generateMovement = ({ startTime, type, name, miss, reactionTimeMultiplier }) => {
  // calculating reaction time with value big enough for the movement
  const randomMultiplier = Math.random() * 0.5 + 0.5;
  let reactionTime =
    duelParameters.reactionTimeCoefficient * duelParameters.movementDuration * randomMultiplier;

  // change reaction time if needed
  if (reactionTimeMultiplier !== undefined) {
    reactionTime *= reactionTimeMultiplier;
  }

  // creating and returning a movement
  return {
    startTime: startTime + reactionTime,
    type,
    name,
    miss,
  };
};

/**
  @summary Changes upperBodyMovementName according to leadingSide
  @param upperBodyMovementName name of the movement for the upper body
  @param leadingSide boxer leading side
*/
const applyLeadingSide = ({ upperBodyMovementName, leadingSide }) => {
  // if the model is mirrored (normal is "right")
  if (leadingSide === 'left') {
    // swap "left" with "right" and vice versa if needed
    if (upperBodyMovementName.includes('left')) {
      upperBodyMovementName.replace('left', 'right');
    } else {
      upperBodyMovementName.replace('right', 'left');
    }
  }
};

/**
  @summary Generates offensive movements based on chances and random
  @param params
  @param params.startTime movement timing start time
  @param params.leadingSide boxer leading side
  @param params.miss if the attack or defense is missed
  @param params.chancesOfMovements an object with chances of each movement
  @param params.reactionTimeMultiplier reaction time multiplier for internal recursive use
  @param params.maxMovementsCount max movements count for recursive use
  @returns new movements list
*/
const generateOffensiveMovements = ({
  startTime,
  leadingSide,
  miss,
  chancesOfMovements,
  reactionTimeMultiplier,
  maxMovementsCount,
}) => {
  if (maxMovementsCount <= 0) {
    return [];
  }

  // new movements in startTime ascending order
  let newMovements = [];

  let lowerBodyMovementName, upperBodyMovementName;

  let type;

  // choosing the attack movement type
  const randomChance = Math.random();

  // brute force attack
  if (randomChance < chancesOfMovements.offensive.bruteForce) {
    // getting random brute force attack movement from the list
    const randomIndex = Math.floor(Math.random() * offensiveAnimationNames.bruteForceAttack.length);
    upperBodyMovementName = offensiveAnimationNames.bruteForceAttack[randomIndex];

    type = 'bruteForce';
  }

  // deceptive attack
  else if (
    randomChance <
    chancesOfMovements.offensive.bruteForce + chancesOfMovements.offensive.deceptive
  ) {
    // getting random deceptive attack movement from the list
    const randomIndex = Math.floor(Math.random() * offensiveAnimationNames.deceptiveAttack.length);
    upperBodyMovementName = offensiveAnimationNames.deceptiveAttack[randomIndex];

    type = 'deceptive';

    // generating and pushing deceptive attack movement
    newMovements.push(
      ...generateOffensiveMovements({
        startTime,
        leadingSide,
        miss: true,
        chancesOfMovements,
        reactionTimeMultiplier:
          reactionTimeMultiplier === undefined ? 0.1 : reactionTimeMultiplier * 0.1,
        maxMovementsCount: maxMovementsCount - 1,
      })
    );
  }

  // error
  else {
    upperBodyMovementName = offensiveAnimationNames.bruteForceAttack[0];
    type = 'bruteForce';

    console.log("error: calculateMovements (1)");
  }

  // taking into account leading side
  applyLeadingSide({ upperBodyMovementName, leadingSide });

  // getting random lower body movement from the list
  // according to the upper body movement
  const randomIndex = Math.floor(Math.random() * lowerAnimationNames[upperBodyMovementName].length);
  lowerBodyMovementName = lowerAnimationNames[upperBodyMovementName][randomIndex];

  // packing movements for different body parts into one object
  const movementName = {
    lower: lowerBodyMovementName,
    upper: upperBodyMovementName,
  };

  // generating the movement
  newMovements.push(
    generateMovement({
      startTime,
      type,
      name: movementName,
      miss,
    })
  );

  // returning new movements
  return newMovements;
};

/**
  @summary Generates defensive movements based on chances and random
  @param params
  @param params.startTime movement timing start time
  @param params.leadingSide boxer leading side
  @param params.miss if the attack or defense is missed
  @param params.chancesOfMovements an object with chances of each movement
  @param params.offensiveMovement offensive movement name
  @param params.reactionTimeMultiplier reaction time multiplier for internal recursive use
  @param params.maxMovementsCount max movements count for recursive use
  @returns new movements list
*/
const generateDefensiveMovements = ({
  startTime,
  leadingSide,
  miss,
  chancesOfMovements,
  offensiveMovements,
  reactionTimeMultiplier,
  maxMovementsCount,
}) => {
  if (maxMovementsCount <= 0) {
    return [];
  }

  // new movements in startTime ascending order
  let newMovements = [];

  let lowerBodyMovementName, upperBodyMovementName;

  let type;

  // unpacking the first movement
  const offensiveMovement = offensiveMovements[0];

  // choosing the defense movement type
  const randomChance = Math.random();

  // block
  if (randomChance < chancesOfMovements.defensive.block) {
    // getting random block defense movement from the list
    const randomIndex = Math.floor(
      Math.random() * defensiveAnimationNames[offensiveMovement.name.upper].block.length
    );
    upperBodyMovementName =
      defensiveAnimationNames[offensiveMovement.name.upper].block[randomIndex];

    type = 'block';
  }

  // dodge
  else if (randomChance < chancesOfMovements.defensive.block + chancesOfMovements.defensive.dodge) {
    // getting random dodge defense movement from the list
    const randomIndex = Math.floor(
      Math.random() * defensiveAnimationNames[offensiveMovement.name.upper].dodge.length
    );
    upperBodyMovementName =
      defensiveAnimationNames[offensiveMovement.name.upper].dodge[randomIndex];

    type = 'dodge';
  }

  // error
  else {
    upperBodyMovementName = defensiveAnimationNames.block[0];
    type = 'block';

    console.log("error: calculateMovements (2)");
  }

  // if defensive movement is missed
  if (miss && missAnimationNames.hasOwnProperty(upperBodyMovementName)) {
    // setting appropriate animation of missing the hit
    upperBodyMovementName = missAnimationNames[upperBodyMovementName];
  }

  // taking into account leading side
  applyLeadingSide({ upperBodyMovementName, leadingSide });

  // getting random lower body movement from the list
  // according to the upper body movement
  const randomIndex = Math.floor(Math.random() * lowerAnimationNames[upperBodyMovementName].length);
  lowerBodyMovementName = lowerAnimationNames[upperBodyMovementName][randomIndex];

  // packing movements for different body parts into one object
  const movementName = {
    lower: lowerBodyMovementName,
    upper: upperBodyMovementName,
  };

  // generating the first movement
  newMovements.push(
    generateMovement({
      startTime,
      type,
      name: movementName,
      miss,
    })
  );

  // generating the rest of mevements if needed
  if (offensiveMovements.length >= 2) {
    newMovements.push(
      ...generateDefensiveMovements({
        startTime,
        leadingSide,
        miss,
        chancesOfMovements,
        offensiveMovements: offensiveMovements.slice(1),
        reactionTimeMultiplier:
          reactionTimeMultiplier === undefined ? 0.1 : reactionTimeMultiplier * 0.1,
        maxMovementsCount: maxMovementsCount - 1,
      })
    );
  }

  // returning new movements
  return newMovements;
};

/**
  @summary Generates probe movements based on random
  @param params
  @param params.startTime movement timing start time
  @param params.leadingSide boxer leading side
  @param params.maxMovementsCount max movements count for recursive use
  @returns new movements list
*/
const generateProbeMovements = ({ startTime, leadingSide, maxMovementsCount }) => {
  if (maxMovementsCount <= 0) {
    return [];
  }

  // new movements in startTime ascending order
  let newMovements = [];

  let lowerBodyMovementName, upperBodyMovementName;

  // getting random probe movement from the list
  // with leading side taken into account
  let randomIndex = Math.floor(Math.random() * probeAnimationNames.length);
  upperBodyMovementName = probeAnimationNames[randomIndex];
  applyLeadingSide({ upperBodyMovementName, leadingSide });

  // getting random lower body movement from the list
  // according to the upper body movement
  randomIndex = Math.floor(Math.random() * lowerAnimationNames[upperBodyMovementName].length);
  lowerBodyMovementName = lowerAnimationNames[upperBodyMovementName][randomIndex];

  // packing movements for different body parts into one object
  const movementName = {
    lower: lowerBodyMovementName,
    upper: upperBodyMovementName,
  };

  // generating the movement
  newMovements.push(
    generateMovement({
      startTime,
      type: 'probe',
      name: movementName,
      miss: true,
    })
  );

  // returning new movements
  return newMovements;
};

/**
  @summary Generates switch leading side movements
  @param params
  @param params.startTime movement timing start time
  @param params.maxMovementsCount max movements count for recursive use
  @returns new movements list
*/
const generateSwitchLeadingSideMovements = ({ startTime, maxMovementsCount }) => {
  if (maxMovementsCount <= 0) {
    return [];
  }

  // new movements in startTime ascending order
  let newMovements = [];

  // packing movement for the whole body into an object
  const movementName = {
    whole: switchLeadingSideAnimationName,
  };

  // generating the movement
  newMovements.push(
    generateMovement({
      startTime,
      type: 'switchLeadingSide',
      name: movementName,
      miss: false,
    })
  );

  // returning new movements
  return newMovements;
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
const calculateMovements = (boxersChancesOfMovements, boxersLeadingSides, winner) => {
  // unpacking chances of movements and leading sides
  const { leftBoxerChancesOfMovements, rightBoxerChancesOfMovements } = boxersChancesOfMovements;
  const { leftBoxerLeadingSide, rightBoxerLeadingSide } = boxersLeadingSides;

  let leftBoxerMovements = [],
    rightBoxerMovements = [];

  // calculating movement timings
  const movementTimings = calculateMovementTimings(
    leftBoxerLeadingSide,
    rightBoxerLeadingSide,
    winner
  );

  // for each movement timing
  movementTimings.forEach((movementTiming) => {
    // function to generate boxer movement
    const generateBoxerMovements = ({
      startTime,
      boxerMovement,
      opponentMovements,
      chancesOfMovements,
      maxMovementsCount,
    }) => {
      let newMovements;

      // offensive movement
      if (boxerMovement.movementType === 'offensive') {
        newMovements = generateOffensiveMovements({
          startTime,
          leadingSide: boxerMovement.leadingSide,
          miss: boxerMovement.miss,
          chancesOfMovements,
          maxMovementsCount,
        });
      }

      // defensive movement
      else if (boxerMovement.movementType === 'defensive') {
        newMovements = generateDefensiveMovements({
          startTime,
          leadingSide: boxerMovement.leadingSide,
          miss: boxerMovement.miss,
          chancesOfMovements,
          offensiveMovements: opponentMovements,
          maxMovementsCount,
        });
      }

      // probe movement
      else if (boxerMovement.movementType === 'probe') {
        newMovements = generateProbeMovements({
          startTime,
          leadingSide: boxerMovement.leadingSide,
          maxMovementsCount,
        });
      }

      // switch leading side movement
      else if (boxerMovement.movementType === 'switchLeadingSide') {
        newMovements = generateSwitchLeadingSideMovements({ startTime, maxMovementsCount });
      }

      // error
      else {
        console.log("error: calculateMovements (3)");
      }

      // returning new movements
      return newMovements;
    };

    // generating boxer movements
    // there can be multiple of them for each boxer
    let newLeftBoxerMovements, newRightBoxerMovements;

    // if left boxer attacks and right defends
    if (
      movementTiming.leftBoxer.movementType === 'offensive' &&
      movementTiming.rightBoxer.movementType === 'defensive'
    ) {
      // left boxer
      newLeftBoxerMovements = generateBoxerMovements({
        startTime: movementTiming.startTime,
        boxerMovement: movementTiming.leftBoxer,
        opponentMovements: undefined,
        chancesOfMovements: leftBoxerChancesOfMovements,
        maxMovementsCount: 2,
      });

      // right boxer
      newRightBoxerMovements = generateBoxerMovements({
        startTime: movementTiming.startTime,
        boxerMovement: movementTiming.rightBoxer,
        opponentMovements: newLeftBoxerMovements,
        chancesOfMovements: rightBoxerChancesOfMovements,
        maxMovementsCount: 2,
      });
    }

    // if right boxer attacks and left defends
    else if (
      movementTiming.rightBoxer.movementType === 'offensive' &&
      movementTiming.leftBoxer.movementType === 'defensive'
    ) {
      // right boxer
      newRightBoxerMovements = generateBoxerMovements({
        startTime: movementTiming.startTime,
        boxerMovement: movementTiming.rightBoxer,
        opponentMovements: undefined,
        chancesOfMovements: rightBoxerChancesOfMovements,
        maxMovementsCount: 2,
      });

      // left boxer
      newLeftBoxerMovements = generateBoxerMovements({
        startTime: movementTiming.startTime,
        boxerMovement: movementTiming.leftBoxer,
        opponentMovements: newRightBoxerMovements,
        chancesOfMovements: leftBoxerChancesOfMovements,
        maxMovementsCount: 2,
      });
    }

    // if both boxers defend
    // pass fake opponent movements so that both defences can be handled
    else if (
      movementTiming.leftBoxer.movementType === 'defensive' &&
      movementTiming.rightBoxer.movementType === 'defensive'
    ) {
      let randomIndex;
      let upperBodyMovementName;

      // getting random brute force attack movement from the list
      randomIndex = Math.floor(Math.random() * offensiveAnimationNames.bruteForceAttack.length);
      upperBodyMovementName = offensiveAnimationNames.bruteForceAttack[randomIndex];

      // left boxer
      newLeftBoxerMovements = generateBoxerMovements({
        startTime: movementTiming.startTime,
        boxerMovement: movementTiming.leftBoxer,
        opponentMovements: [{ name: { upper: upperBodyMovementName } }],
        chancesOfMovements: leftBoxerChancesOfMovements,
        maxMovementsCount: 1,
      });

      // getting random brute force attack movement from the list
      randomIndex = Math.floor(Math.random() * offensiveAnimationNames.bruteForceAttack.length);
      upperBodyMovementName = offensiveAnimationNames.bruteForceAttack[randomIndex];

      // right boxer
      newRightBoxerMovements = generateBoxerMovements({
        startTime: movementTiming.startTime,
        boxerMovement: movementTiming.rightBoxer,
        opponentMovements: [{ name: { upper: upperBodyMovementName } }],
        chancesOfMovements: rightBoxerChancesOfMovements,
        maxMovementsCount: 1,
      });
    }

    // if both boxers attack
    else {
      // left boxer
      newLeftBoxerMovements = generateBoxerMovements({
        startTime: movementTiming.startTime,
        boxerMovement: movementTiming.leftBoxer,
        opponentMovements: undefined,
        chancesOfMovements: leftBoxerChancesOfMovements,
        maxMovementsCount: 1,
      });

      // right boxer
      newRightBoxerMovements = generateBoxerMovements({
        startTime: movementTiming.startTime,
        boxerMovement: movementTiming.rightBoxer,
        opponentMovements: undefined,
        chancesOfMovements: rightBoxerChancesOfMovements,
        maxMovementsCount: 1,
      });
    }

    // pushing generated boxer movements to appropriate lists
    leftBoxerMovements.push(...newLeftBoxerMovements);
    rightBoxerMovements.push(...newRightBoxerMovements);
  });

  // calculating health levels
  calculateHealthLevels(leftBoxerMovements, rightBoxerMovements);

  return {
    leftBoxerMovements,
    rightBoxerMovements,
    winner,
  };
};

export default calculateMovements;
