/** @module containers/Game/services/algorithms/calculateDuelScenario/calculateHealthLevels */

import duelParameters from '../../constants/duelParameters';

/**
  @summary Transforms and saturates health levels in movements lists
  @param leftBoxerMovements left boxer movements list
  @param rightBoxerMovements right boxer movements list
  @param winner winner of the duel
*/
const calculateSaturatedHealthLevels = (leftBoxerMovements, rightBoxerMovements, winner) => {
  // calculating current health loss level for further reducing
  let leftBoxerCurrentHealthLoss = 0.0,
    rightBoxerCurrentHealthLoss = 0.0;

  // transforming health loss to current health levels
  for (let i = 0; i < leftBoxerMovements.length; ++i) {
    leftBoxerCurrentHealthLoss += leftBoxerMovements[i].health;
    rightBoxerCurrentHealthLoss += rightBoxerMovements[i].health;

    leftBoxerMovements[i].health = leftBoxerCurrentHealthLoss;
    rightBoxerMovements[i].health = rightBoxerCurrentHealthLoss;
  }

  // calculating maximal health level for further reducing
  const maxHealtLevel = Math.max(leftBoxerCurrentHealthLoss, rightBoxerCurrentHealthLoss);

  // if left boxer is winner and his health level is lower
  // increase left boxer health level
  if (winner === 'left' && leftBoxerCurrentHealthLoss < maxHealtLevel) {
    // calculating delta health
    const deltaHealth = 1.0 + maxHealtLevel - leftBoxerCurrentHealthLoss;

    // adding delta health
    for (let i = 0; i < leftBoxerMovements.length; ++i) {
      leftBoxerMovements[i].health += deltaHealth;
    }
  }

  // if right boxer is winner and his health level is lower
  // increase right boxer health level
  if (winner === 'right' && rightBoxerCurrentHealthLoss < maxHealtLevel) {
    // calculating delta health
    const deltaHealth = 1.0 + maxHealtLevel - rightBoxerCurrentHealthLoss;

    // adding delta health
    for (let i = 0; i < rightBoxerMovements.length; ++i) {
      rightBoxerMovements[i].health += deltaHealth;
    }
  }

  // transforming health loss to health level
  // and reducing it in range from zero to one
  for (let i = 0; i < leftBoxerMovements.length; ++i) {
    leftBoxerMovements[i].health = 1.0 - leftBoxerMovements[i].health / maxHealtLevel;
    rightBoxerMovements[i].health = 1.0 - rightBoxerMovements[i].health / maxHealtLevel;
  }
};

/**
  @summary Calculates health levels in movements lists
  @param leftBoxerMovements left boxer movements list
  @param rightBoxerMovements right boxer movements list
  @param winner winner of the duel
*/
const calculateHealthLevels = (leftBoxerMovements, rightBoxerMovements, winner) => {
  // function to calculate health loss of given movement
  const calculateHealthLoss = (boxerMovement, opponentMovement) => {
    // setting initial health loss for the movement
    boxerMovement.health = 0.0;

    // opponent brute force attack
    if (opponentMovement.type === 'bruteForce') {
      // boxer block defense
      if (boxerMovement.type === 'block') {
        boxerMovement.health += !boxerMovement.miss
          ? duelParameters.bruteForceAttackDefenseBlockSuccessHealthLoss
          : duelParameters.bruteForceAttackDefenseFailHealthLoss;
      }

      // boxer dodge defense
      else if (boxerMovement.type === 'dodge') {
        boxerMovement.health += !boxerMovement.miss
          ? duelParameters.bruteForceAttackDefenseDodgeSuccessHealthLoss
          : duelParameters.bruteForceAttackDefenseFailHealthLoss;
      }

      // other boxer movements
      else {
        boxerMovement.health += duelParameters.bruteForceAttackDefenseFailHealthLoss;
      }
    }

    // opponent deceptive attack
    else if (opponentMovement.type === 'deceptive') {
      // boxer block defense
      if (boxerMovement.type === 'block') {
        boxerMovement.health += !boxerMovement.miss
          ? duelParameters.deceptiveAttackDefenseBlockSuccessHealthLoss
          : duelParameters.deceptiveAttackDefenseFailHealthLoss;
      }

      // boxer dodge defense
      else if (boxerMovement.type === 'dodge') {
        boxerMovement.health += !boxerMovement.miss
          ? duelParameters.deceptiveAttackDefenseDodgeSuccessHealthLoss
          : duelParameters.deceptiveAttackDefenseFailHealthLoss;
      }

      // other boxer movements
      else {
        boxerMovement.health += duelParameters.deceptiveAttackDefenseFailHealthLoss;
      }
    }

    // there is no damage to boxer if his opponent has missed
    if (opponentMovement.miss) {
      boxerMovement.health = 0.0;
    }

    // boxer brute force attack
    if (boxerMovement.type === 'bruteForce') {
      boxerMovement.health += duelParameters.bruteForceAttackHealthLoss;
    }

    // boxer deceptive attack
    else if (boxerMovement.type === 'deceptive') {
      boxerMovement.health += duelParameters.deceptiveAttackHealthLoss;
    }
  };

  // calculating health loss
  for (let i = 0; i < leftBoxerMovements.length; ++i) {
    calculateHealthLoss(leftBoxerMovements[i], rightBoxerMovements[i]);
    calculateHealthLoss(rightBoxerMovements[i], leftBoxerMovements[i]);
  }

  // calculating saturated health levels based on healt loss
  // so both boxers have health level equal to one at the beginning,
  // loser has zero and winner has non-zero value at the end
  calculateSaturatedHealthLevels(leftBoxerMovements, rightBoxerMovements, winner);
};

export default calculateHealthLevels;
