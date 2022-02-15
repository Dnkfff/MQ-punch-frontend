/** @module containers/Game/services/algorithms/calculateDuelScenario/calculateConcentrationLevels */

import duelParameters from '../../constants/duelParameters';

/**
  @summary Transforms and saturates concentration levels in movements lists
  @param leftBoxerMovements left boxer movements list
  @param rightBoxerMovements right boxer movements list
  @param winner winner of the duel
*/
const calculateSaturatedConcentrationLevels = (leftBoxerMovements, rightBoxerMovements, winner) => {
  // calculating current concentration loss level for further reducing
  let leftBoxerCurrentConcentrationLoss = 0.0,
    rightBoxerCurrentConcentrationLoss = 0.0;

  // transforming concentration loss to current concentration levels
  for (let i = 0; i < leftBoxerMovements.length; ++i) {
    leftBoxerCurrentConcentrationLoss += leftBoxerMovements[i].concentration;
    rightBoxerCurrentConcentrationLoss += rightBoxerMovements[i].concentration;

    leftBoxerMovements[i].concentration = leftBoxerCurrentConcentrationLoss;
    rightBoxerMovements[i].concentration = rightBoxerCurrentConcentrationLoss;
  }

  // calculating maximal concentration level for further reducing
  const maxHealtLevel = Math.max(
    leftBoxerCurrentConcentrationLoss,
    rightBoxerCurrentConcentrationLoss
  );

  // if left boxer is winner and his concentration level is lower
  // increase left boxer concentration level
  if (winner === 'left' && leftBoxerCurrentConcentrationLoss < maxHealtLevel) {
    // calculating delta concentration
    const deltaConcentration = 1.0 + maxHealtLevel - leftBoxerCurrentConcentrationLoss;

    // adding delta concentration
    for (let i = 0; i < leftBoxerMovements.length; ++i) {
      leftBoxerMovements[i].concentration += deltaConcentration;
    }
  }

  // if right boxer is winner and his concentration level is lower
  // increase right boxer concentration level
  if (winner === 'right' && rightBoxerCurrentConcentrationLoss < maxHealtLevel) {
    // calculating delta concentration
    const deltaConcentration = 1.0 + maxHealtLevel - rightBoxerCurrentConcentrationLoss;

    // adding delta concentration
    for (let i = 0; i < rightBoxerMovements.length; ++i) {
      rightBoxerMovements[i].concentration += deltaConcentration;
    }
  }

  // transforming concentration loss to concentration level
  // and reducing it in range from zero to one
  for (let i = 0; i < leftBoxerMovements.length; ++i) {
    leftBoxerMovements[i].concentration = 1.0 - leftBoxerMovements[i].concentration / maxHealtLevel;
    rightBoxerMovements[i].concentration =
      1.0 - rightBoxerMovements[i].concentration / maxHealtLevel;
  }
};

/**
  @summary Calculates concentration levels in movements lists
  @param leftBoxerMovements left boxer movements list
  @param rightBoxerMovements right boxer movements list
  @param winner winner of the duel
*/
const calculateConcentrationLevels = (leftBoxerMovements, rightBoxerMovements, winner) => {
  // function to calculate concentration loss of given movement
  const calculateConcentrationLoss = (boxerMovement, opponentMovement) => {
    // setting initial concentration loss for the movement
    boxerMovement.concentration = 0.0;

    // opponent brute force attack
    if (opponentMovement.type === 'bruteForce') {
      // boxer block defense
      if (boxerMovement.type === 'block') {
        boxerMovement.concentration += !boxerMovement.miss
          ? duelParameters.bruteForceAttackDefenseBlockSuccessConcentrationLoss
          : duelParameters.bruteForceAttackDefenseFailConcentrationLoss;
      }

      // boxer dodge defense
      else if (boxerMovement.type === 'dodge') {
        boxerMovement.concentration += !boxerMovement.miss
          ? duelParameters.bruteForceAttackDefenseDodgeSuccessConcentrationLoss
          : duelParameters.bruteForceAttackDefenseFailConcentrationLoss;
      }

      // other boxer movements
      else {
        boxerMovement.concentration += duelParameters.bruteForceAttackDefenseFailConcentrationLoss;
      }
    }

    // opponent deceptive attack
    else if (opponentMovement.type === 'deceptive') {
      // boxer block defense
      if (boxerMovement.type === 'block') {
        boxerMovement.concentration += !boxerMovement.miss
          ? duelParameters.deceptiveAttackDefenseBlockSuccessConcentrationLoss
          : duelParameters.deceptiveAttackDefenseFailConcentrationLoss;
      }

      // boxer dodge defense
      else if (boxerMovement.type === 'dodge') {
        boxerMovement.concentration += !boxerMovement.miss
          ? duelParameters.deceptiveAttackDefenseDodgeSuccessConcentrationLoss
          : duelParameters.deceptiveAttackDefenseFailConcentrationLoss;
      }

      // other boxer movements
      else {
        boxerMovement.concentration += duelParameters.deceptiveAttackDefenseFailConcentrationLoss;
      }
    }

    // there is no damage to boxer if his opponent has missed
    if (opponentMovement.miss) {
      boxerMovement.concentration = 0.0;
    }

    // boxer brute force attack
    if (boxerMovement.type === 'bruteForce') {
      boxerMovement.concentration += duelParameters.bruteForceAttackConcentrationLoss;
    }

    // boxer deceptive attack
    else if (boxerMovement.type === 'deceptive') {
      boxerMovement.concentration += duelParameters.deceptiveAttackConcentrationLoss;
    }
  };

  // calculating concentration loss
  for (let i = 0; i < leftBoxerMovements.length; ++i) {
    calculateConcentrationLoss(leftBoxerMovements[i], rightBoxerMovements[i]);
    calculateConcentrationLoss(rightBoxerMovements[i], leftBoxerMovements[i]);
  }

  // calculating saturated concentration levels based on healt loss
  // so both boxers have concentration level equal to one at the beginning,
  // loser has zero and winner has non-zero value at the end
  calculateSaturatedConcentrationLevels(leftBoxerMovements, rightBoxerMovements, winner);
};

export default calculateConcentrationLevels;
