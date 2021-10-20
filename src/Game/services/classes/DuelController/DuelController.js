import { calculateBarycenterOfBoxers } from './duelAlgorithms';

import duelParameters from '../../constants/duelParameters';
import viewNames from '../../constants/viewNames';


class DuelController {
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
    }

    act(deltaTime) {
      if (this.mode === 'run') {
        this.currentTime += deltaTime;

        const animateBoxer = (boxerMoves, finishedBoxerMoves, boxer) => {
          if (boxerMoves[0]?.startTime <= this.currentTime) {
            const boxerMove = boxerMoves.shift();
            finishedBoxerMoves.push(boxerMove);
            boxer.requestAnimation(boxerMove.move.lower, 'lower');
            boxer.requestAnimation(boxerMove.move.upper, 'upper');
          }
        };

        animateBoxer(this.leftBoxerMoves, this.finishedLeftBoxerMoves, this.leftBoxer);
        animateBoxer(this.rightBoxerMoves, this.finishedRightBoxerMoves, this.rightBoxer);

        if (this.leftBoxerMoves.length === 0 && this.rightBoxerMoves.length === 0) {
          this.prepareSlowMotion();
        }

        this.leftBoxer.animate(deltaTime);
        this.rightBoxer.animate(deltaTime);
      } else if (this.mode === 'slowmotion') {
        this.currentTime += deltaTime * duelParameters.slowMotionMultiplier;

        const animateBoxer = (boxerMoves, boxer) => {
          if (boxerMoves[0]?.startTime <= this.currentTime) {
            const boxerMove = boxerMoves.shift();
            boxer.requestAnimation(boxerMove.move.lower, 'lower');
            boxer.requestAnimation(boxerMove.move.upper, 'upper');
          }
        };

        animateBoxer(this.leftBoxerMoves, this.leftBoxer);
        animateBoxer(this.rightBoxerMoves, this.rightBoxer);

        if (this.leftBoxerMoves.length === 0 && this.rightBoxerMoves.length === 0) {
          this.prepareSlowMotion();
        }

        this.leftBoxer.animate(deltaTime * duelParameters.slowMotionMultiplier);
        this.rightBoxer.animate(deltaTime * duelParameters.slowMotionMultiplier);
      }
    }

    prepareSlowMotion() {
      this.mode = 'slowmotion';

      for (let i = 0; i < duelParameters.slowMotionMovesNumber; i++) {
        this.leftBoxerMoves.push(this.finishedLeftBoxerMoves[i]);
        this.rightBoxerMoves.push(this.finishedRightBoxerMoves[i]);
      }

      this.currentTime = Math.min(this.finishedLeftBoxerMoves[0].startTime, this.finishedRightBoxerMoves[0].startTime);

      this.cameraController.setView(viewNames[Math.floor(this.currentCameraViewNumber / 2)]);
      const numberIsPair = (this.currentCameraViewNumber % 2 === 0);
      const leftBoxerIsWinner = true; // needs to be changed
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

    run() {
      this.mode = 'run';
    }
}

export default DuelController;
