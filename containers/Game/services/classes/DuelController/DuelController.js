/** @module containers/Game/services/classes/DuelContoller/DuelContoller */

import { switchBoxerLeadingSide, calculateDistanceCoefficient, moveBoxer } from './duelAlgorithms';

import duelParameters from '../../constants/duelParameters';
import viewNames from '../../constants/viewNames';


/**
  @summary The DuelContoller class
  @description Requests specified in the duelScenario animations at each moment of time for each boxer
  and views for the cameraController according to the duel.
  @class
*/
class DuelController {
  /**
    @summary DuelController constructor
    @constructor
    @param params
    @param params.duelScenario duel scenario object
    @param params.leftBoxer left Boxer instance
    @param params.rightBoxer right Boxer instance
    @param params.cameraController CameraController instance
  */
  constructor({ duelScenario, leftBoxer, rightBoxer, cameraController }) {
    this.leftBoxer = leftBoxer;
    this.rightBoxer = rightBoxer;
    this.leftBoxerMoves = duelScenario.leftBoxerMoves.slice();
    this.rightBoxerMoves = duelScenario.rightBoxerMoves.slice();
    this.finishedLeftBoxerMoves = [];
    this.finishedRightBoxerMoves = [];
    this.currentTime = 0.0;
    this.mode = 'stop';
    this.cameraController = cameraController;
    this.currentCameraViewNumber = 0;
    this.winner = duelScenario.winner;
  }

  /**
    @summary Follows the duelScenario
    @description Requests boxer animations and moves boxers,
    writs passed moves from the duelScenario to the special list for slowmotion mode.
    @param deltaTime time in ms passed since the last call
  */
  act(deltaTime) {
    if (this.mode !== 'stop') {
      if (this.mod === 'slowmotion') {
        deltaTime *= duelParameters.slowMotionMultiplier;
      }

      this.currentTime += deltaTime;

      const animateBoxer = (boxerMoves, finishedBoxerMoves, boxer) => {
        if (boxerMoves[0]?.startTime <= this.currentTime) {
          const boxerMove = boxerMoves.shift();

          if (this.mode === 'run') {
            finishedBoxerMoves.push(boxerMove);
          }

          if (boxerMove.move.whole !== undefined) {
            boxer.requestAnimation(boxerMove.move.whole, 'whole');

            switchBoxerLeadingSide(boxer, boxerMove);
          } else {
            boxer.requestAnimation(boxerMove.move.lower, 'lower');
            boxer.requestAnimation(boxerMove.move.upper, 'upper');

            const coefficient = calculateDistanceCoefficient(this.leftBoxer, this.rightBoxer);
            moveBoxer(boxer, boxerMove, coefficient);
          }
        }
      };

      animateBoxer(this.leftBoxerMoves, this.finishedLeftBoxerMoves, this.leftBoxer);
      animateBoxer(this.rightBoxerMoves, this.finishedRightBoxerMoves, this.rightBoxer);

      this.leftBoxer.face(this.rightBoxer);
      this.rightBoxer.face(this.leftBoxer);

      this.leftBoxer.animate(deltaTime);
      this.rightBoxer.animate(deltaTime);

      if (this.leftBoxerMoves.length === 0 && this.rightBoxerMoves.length === 0) {
        this.prepareSlowMotion();
      }
    }
  }

  /**
    @summary Prepares boxer moves lists and sets execution mode to slowmotion
  */
  prepareSlowMotion() {
    this.mode = 'slowmotion';

    for (let i = 0; i < duelParameters.slowMotionMovesNumber; i++) {
      this.leftBoxerMoves.push(this.finishedLeftBoxerMoves[i]);
      this.rightBoxerMoves.push(this.finishedRightBoxerMoves[i]);
    }

    this.currentTime = Math.min(this.finishedLeftBoxerMoves[0].startTime, this.finishedRightBoxerMoves[0].startTime);

    this.cameraController.setView(viewNames[Math.floor(this.currentCameraViewNumber / 2)]);
    const numberIsPair = (this.currentCameraViewNumber % 2 === 0);
    const leftBoxerIsWinner = (this.winner === 'left');
    if (numberIsPair === leftBoxerIsWinner) {
      this.cameraController.setTargetModel(this.rightBoxer.model);
    } else {
      this.cameraController.setTargetModel(this.leftBoxer.model);
    }
    this.currentCameraViewNumber++;
    if (this.currentCameraViewNumber === viewNames.length * 2) {
      this.currentCameraViewNumber = 0;
      this.mode = 'stop';
    }
  }

  /**
    @summary Sets execution mode to run
  */
  run() {
    this.mode = 'run';
  }
}

export default DuelController;
