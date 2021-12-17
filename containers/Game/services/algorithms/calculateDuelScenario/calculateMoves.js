/** @module containers/Game/services/algorithms/calculateDuelScenario/calculateMoves */

import calculateMoveTimings from "./calculateMoveTimings";

import duelParameters from "../../constants/duelParameters";
import {
  probeAnimationNames,
  offensiveAnimationNames,
  defensiveAnimationNames,
  lowerAnimationNames,
  switchLeadingSideAnimationName,
} from "../../constants/duelAnimationNames";

/**
  @summary Pushes specified move into moves list
  @description Contains random.
  @param move move object
  @param moveTimingStartTime move start time
  @param moves moves list
*/
const pushTheMove = (move, moveTimingStartTime, moves) => {
  const randomMultiplier = 0.5 + 0.5 * Math.random();
  const reactionTime =
    duelParameters.reactionTimeCoefficient *
    duelParameters.moveDuration *
    randomMultiplier;
  const randomChance = Math.random();
  moves.push({
    startTime: moveTimingStartTime + reactionTime,
    move,
    hit: randomChance < duelParameters.chanceOfHit,
  });
};

/**
  @summary Changes upperBodyMoveName according to leadinSide
  @param upperBodyMoveName
  @param leadingSide
*/
const applyLeadingSide = (upperBodyMoveName, leadingSide) => {
  if (leadingSide === "left") {
    if (upperBodyMoveName.includes("left")) {
      upperBodyMoveName.replace("left", "right");
    } else {
      upperBodyMoveName.replace("right", "left");
    }
  }
};

/**
  @summary Pushes probe move into moves list
  @description Contains random.
  @param params
  @param params.moveTimingStartTime move timing start time
  @param params.moves moves list
  @param params.leadingSide
*/
const pushProbeMove = ({ moveTimingStartTime, moves, leadingSide }) => {
  let lowerBodyMoveName, upperBodyMoveName;

  let randomIndex = Math.floor(Math.random() * probeAnimationNames.length);
  upperBodyMoveName = probeAnimationNames[randomIndex];
  applyLeadingSide(upperBodyMoveName, leadingSide);

  randomIndex = Math.floor(
    Math.random() * lowerAnimationNames[upperBodyMoveName].length
  );
  lowerBodyMoveName = lowerAnimationNames[upperBodyMoveName][randomIndex];

  const move = {
    lower: lowerBodyMoveName,
    upper: upperBodyMoveName,
  };
  pushTheMove(move, moveTimingStartTime, moves);
};

/**
  @summary Pushes deceptive attack move into moves list
  @description Contains random.
  @param params
  @param params.moveTimingStartTime move timing start time
  @param params.moves moves list
  @param params.leadingSide
*/
const pushDeceptiveAttackMove = ({
  moveTimingStartTime,
  moves,
  leadingSide,
}) => {
  let lowerBodyMoveName, upperBodyMoveName;

  let randomIndex = Math.floor(
    Math.random() * offensiveAnimationNames.deceptiveAttack.length
  );
  upperBodyMoveName = offensiveAnimationNames.deceptiveAttack[randomIndex];
  applyLeadingSide(upperBodyMoveName, leadingSide);

  randomIndex = Math.floor(
    Math.random() * lowerAnimationNames[upperBodyMoveName].length
  );
  lowerBodyMoveName = lowerAnimationNames[upperBodyMoveName][randomIndex];

  moves.push({
    startTime: moveTimingStartTime,
    move: {
      lower: lowerBodyMoveName,
      upper: upperBodyMoveName,
    },
  });

  return upperBodyMoveName;
};

/**
  @summary Pushes offensive move into moves list
  @description Contains random.
  @param params
  @param params.moveTimingStartTime move timing start time
  @param params.moves moves list
  @param params.leadingSide
  @param params.chancesOfMoves an object with chances of each move
*/
const pushOffensiveMove = ({
  moveTimingStartTime,
  moves,
  leadingSide,
  chancesOfMoves,
}) => {
  let lowerBodyMoveName, upperBodyMoveName;

  let type, deceptiveAttackMoveName;

  const randomChance = Math.random();
  if (randomChance < chancesOfMoves.offensive.chanceOfBruteForceAttack) {
    const randomIndex = Math.floor(
      Math.random() * offensiveAnimationNames.bruteForceAttack.length
    );
    upperBodyMoveName = offensiveAnimationNames.bruteForceAttack[randomIndex];
    type = "bruteForceAttack";
  } else if (
    randomChance <
    chancesOfMoves.offensive.chanceOfBruteForceAttack +
      chancesOfMoves.offensive.chanceOfDeceptiveAttack
  ) {
    const randomIndex = Math.floor(
      Math.random() * offensiveAnimationNames.deceptiveAttack.length
    );
    upperBodyMoveName = offensiveAnimationNames.deceptiveAttack[randomIndex];
    type = "deceptiveAttack";
    deceptiveAttackMoveName = pushDeceptiveAttackMove({
      moveTimingStartTime,
      moves,
      leadingSide,
    });
  } else {
    const randomIndex = Math.floor(
      Math.random() * offensiveAnimationNames.counterAttack.length
    );
    upperBodyMoveName = offensiveAnimationNames.counterAttack[randomIndex];
    type = "counterAttack";
  }
  applyLeadingSide(upperBodyMoveName, leadingSide);

  const randomIndex = Math.floor(
    Math.random() * lowerAnimationNames[upperBodyMoveName].length
  );
  lowerBodyMoveName = lowerAnimationNames[upperBodyMoveName][randomIndex];

  const move = {
    lower: lowerBodyMoveName,
    upper: upperBodyMoveName,
  };
  pushTheMove(move, moveTimingStartTime, moves);

  return {
    name: upperBodyMoveName,
    deceptiveName: deceptiveAttackMoveName,
    type,
  };
};

/**
  @summary Pushes deceptive defence move into moves list
  @description Contains random.
  @param params
  @param params.moveTimingStartTime move timing start time
  @param params.moves moves list
  @param params.leadingSide
  @param params.chancesOfMoves an object with chances of each move
  @param params.offensiveMove offensive move name
*/
const pushDeceptiveDefenseMove = ({
  moveTimingStartTime,
  moves,
  leadingSide,
  chancesOfMoves,
  offensiveMove,
}) => {
  let lowerBodyMoveName, upperBodyMoveName;

  const randomChance = Math.random();
  if (randomChance < chancesOfMoves.defensive.chanceOfBlock) {
    const randomIndex = Math.floor(
      Math.random() * defensiveAnimationNames[offensiveMove.name].block.length
    );
    upperBodyMoveName =
      defensiveAnimationNames[offensiveMove.name].block[randomIndex];
  } else {
    const randomIndex = Math.floor(
      Math.random() * defensiveAnimationNames[offensiveMove.name].dodge.length
    );
    upperBodyMoveName =
      defensiveAnimationNames[offensiveMove.name].dodge[randomIndex];
  }
  applyLeadingSide(upperBodyMoveName, leadingSide);

  const randomIndex = Math.floor(
    Math.random() * lowerAnimationNames[upperBodyMoveName].length
  );
  lowerBodyMoveName = lowerAnimationNames[upperBodyMoveName][randomIndex];

  moves.push({
    startTime: moveTimingStartTime,
    move: {
      lower: lowerBodyMoveName,
      upper: upperBodyMoveName,
    },
  });
};

/**
  @summary Pushes defensive move into moves list
  @description Contains random.
  @param params
  @param params.moveTimingStartTime move timing start time
  @param params.moves moves list
  @param params.leadingSide
  @param params.chancesOfMoves an object with chances of each move
  @param params.offensiveMove offensive move name
*/
const pushDefensiveMove = ({
  moveTimingStartTime,
  moves,
  leadingSide,
  chancesOfMoves,
  offensiveMove,
}) => {
  let lowerBodyMoveName, upperBodyMoveName;

  if (offensiveMove.type !== "counterAttack") {
    if (offensiveMove.type === "deceptiveAttack") {
      const randomChance = Math.random();
      if (randomChance < duelParameters.chanceOfDeceptiveDefenseMove) {
        pushDeceptiveDefenseMove({
          moveTimingStartTime,
          moves,
          leadingSide,
          chancesOfMoves,
          offensiveMove,
        });
      }
    }

    const randomChance = Math.random();
    if (randomChance < chancesOfMoves.defensive.chanceOfBlock) {
      const randomIndex = Math.floor(
        Math.random() * defensiveAnimationNames[offensiveMove.name].block.length
      );
      upperBodyMoveName =
        defensiveAnimationNames[offensiveMove.name].block[randomIndex];
    } else {
      const randomIndex = Math.floor(
        Math.random() * defensiveAnimationNames[offensiveMove.name].dodge.length
      );
      upperBodyMoveName =
        defensiveAnimationNames[offensiveMove.name].dodge[randomIndex];
    }
  } else {
    const randomIndex = Math.floor(
      Math.random() * offensiveAnimationNames.bruteForceAttack.length
    );
    upperBodyMoveName = offensiveAnimationNames.bruteForceAttack[randomIndex];
  }
  applyLeadingSide(upperBodyMoveName, leadingSide);

  const randomIndex = Math.floor(
    Math.random() * lowerAnimationNames[upperBodyMoveName].length
  );
  lowerBodyMoveName = lowerAnimationNames[upperBodyMoveName][randomIndex];

  const move = {
    lower: lowerBodyMoveName,
    upper: upperBodyMoveName,
  };
  pushTheMove(move, moveTimingStartTime, moves);
};

/**
  @summary Pushes switch leading side move into moves list
  @param params
  @param params.moveTimingStartTime move timing start time
  @param params.moves moves list
*/
const pushSwitchLeadingSideMove = ({ moveTimingStartTime, moves }) => {
  const move = {
    whole: switchLeadingSideAnimationName,
  };
  pushTheMove(move, moveTimingStartTime, moves);
};

/**
  @summary Calculates move timings for each boxer
  @param params
  @param params.boxersChancesOfMoves an object with chances of each move for each boxer
  @param params.boxersLeadingSides an object with leading sides of each boxer
  @param params.winner winner of the duel
  @returns an object with leftBoxerMoves (object that contains startTime and move),
  rightBoxerMoves and winner
*/
const calculateMoves = (boxersChancesOfMoves, boxersLeadingSides, winner) => {
  const { leftBoxerChancesOfMoves, rightBoxerChancesOfMoves } =
    boxersChancesOfMoves;
  const { leftBoxerLeadingSide, rightBoxerLeadingSide } = boxersLeadingSides;

  let winnerMoves = [],
    loserMoves = [];

  const moveTimings = calculateMoveTimings(
    leftBoxerLeadingSide,
    rightBoxerLeadingSide,
    winner
  );

  moveTimings.forEach((moveTiming) => {
    const moveTimingStartTime = moveTiming.startTime;
    const leadingSide = moveTiming.loserLeadingSide;

    if (moveTiming.winnerMoveType === "probe") {
      pushProbeMove({ moveTimingStartTime, moves: winnerMoves });
      pushProbeMove({ moveTimingStartTime, moves: loserMoves });
    } else if (moveTiming.winnerMoveType === "offensive") {
      if (winner === "left") {
        const offensiveMove = pushOffensiveMove({
          moveTimingStartTime,
          moves: winnerMoves,
          leadingSide,
          chancesOfMoves: leftBoxerChancesOfMoves,
        });
        pushDefensiveMove({
          moveTimingStartTime,
          moves: loserMoves,
          leadingSide,
          chancesOfMoves: rightBoxerChancesOfMoves,
          offensiveMove,
        });
      } else {
        const offensiveMove = pushOffensiveMove({
          moveTimingStartTime,
          moves: winnerMoves,
          leadingSide,
          chancesOfMoves: rightBoxerChancesOfMoves,
        });
        pushDefensiveMove({
          moveTimingStartTime,
          moves: loserMoves,
          leadingSide,
          chancesOfMoves: leftBoxerChancesOfMoves,
          offensiveMove,
        });
      }
    } else if (moveTiming.winnerMoveType === "defensive") {
      if (winner === "left") {
        const offensiveMove = pushOffensiveMove({
          moveTimingStartTime,
          moves: loserMoves,
          leadingSide,
          chancesOfMoves: rightBoxerChancesOfMoves,
        });
        pushDefensiveMove({
          moveTimingStartTime,
          moves: winnerMoves,
          leadingSide,
          chancesOfMoves: leftBoxerChancesOfMoves,
          offensiveMove,
        });
      } else {
        const offensiveMove = pushOffensiveMove({
          moveTimingStartTime,
          moves: loserMoves,
          leadingSide,
          chancesOfMoves: leftBoxerChancesOfMoves,
        });
        pushDefensiveMove({
          moveTimingStartTime,
          moves: winnerMoves,
          leadingSide,
          chancesOfMoves: rightBoxerChancesOfMoves,
          offensiveMove,
        });
      }
    } else {
      if (moveTiming.winnerMoveType === "switchLeadingSide-winner") {
        pushSwitchLeadingSideMove({ moveTimingStartTime, moves: winnerMoves });
        pushProbeMove({ moveTimingStartTime, moves: loserMoves });
      } else {
        pushSwitchLeadingSideMove({ moveTimingStartTime, moves: loserMoves });
        pushProbeMove({ moveTimingStartTime, moves: winnerMoves });
      }
    }
  });

  return {
    leftBoxerMoves: winner === "left" ? winnerMoves : loserMoves,
    rightBoxerMoves: winner === "left" ? loserMoves : winnerMoves,
    winner,
  };
};

export default calculateMoves;
