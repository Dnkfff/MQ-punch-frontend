import { calculateBarycenterOfBoxers } from './duelAlgorithms';

import duelParameters from '../../constants/duelParameters';
import viewsNames from '../../constants/viewsNames';


class DuelController {
    constructor({ duelScenario, leftBoxer, rightBoxer, cameraController }) {
      this.leftBoxer = leftBoxer;
      this.rightBoxer = rightBoxer;
      this.leftBoxersMoves = duelScenario.leftBoxersMoves.slice();
      this.rightBoxersMoves = duelScenario.rightBoxersMoves.slice();
      this.finishedLeftBoxersMoves = [];
      this.finishedRightBoxersMoves = [];
      this.currentTime = 0.0;
      this.mode = 'stop';
      this.cameraController = cameraController;
      this.currentCameraViewNumber = 0;
    }

    act(deltaTime) {
      if (this.mode === 'run') {
        this.currentTime += deltaTime;

        if (this.leftBoxersMoves[0]?.startTime <= this.currentTime) {
          const move = this.leftBoxersMoves.shift();
          this.finishedLeftBoxersMoves.push(move);
          this.leftBoxer.requestImmediateAnimation(move.move);
        }

        if (this.rightBoxersMoves[0]?.startTime <= this.currentTime) {
          const move = this.rightBoxersMoves.shift();
          this.finishedRightBoxersMoves.push(move);
          this.rightBoxer.requestImmediateAnimation(move.move);
        }

        if (this.leftBoxersMoves.length === 0 && this.rightBoxersMoves.length === 0) {
          this.prepareSlowMotion();
        }

        this.leftBoxer.animate(deltaTime);
        this.rightBoxer.animate(deltaTime);
      } else if (this.mode === 'slowmotion') {
        this.currentTime += deltaTime * duelParameters.slowMotionMultiplier;

        if (this.leftBoxersMoves[0]?.startTime <= this.currentTime) {
          const move = this.leftBoxersMoves.shift();
          this.leftBoxer.requestImmediateAnimation(move.move);
        }

        if (this.rightBoxersMoves[0]?.startTime <= this.currentTime) {
          const move = this.rightBoxersMoves.shift();
          this.rightBoxer.requestImmediateAnimation(move.move);
        }

        if (this.leftBoxersMoves.length === 0 && this.rightBoxersMoves.length === 0) {
          this.prepareSlowMotion();
        }

        this.leftBoxer.animate(deltaTime * duelParameters.slowMotionMultiplier);
        this.rightBoxer.animate(deltaTime * duelParameters.slowMotionMultiplier);
      }
    }

    prepareSlowMotion() {
      this.mode = 'slowmotion';

      for (let i = 0; i < duelParameters.slowMotionMovesNumber; i++) {
        this.leftBoxersMoves.push(this.finishedLeftBoxersMoves[i]);
        this.rightBoxersMoves.push(this.finishedRightBoxersMoves[i]);
      }

      this.currentTime = Math.min(this.finishedLeftBoxersMoves[0].startTime, this.finishedRightBoxersMoves[0].startTime);

      this.cameraController.setView(viewsNames[Math.floor(this.currentCameraViewNumber / 2)]);
      const numberIsPair = (this.currentCameraViewNumber % 2 === 0);
      const leftBoxerIsWinner = true; // needs to be changed
      if (numberIsPair === leftBoxerIsWinner) {
        this.cameraController.setTargetModel(this.rightBoxer.model);
      } else {
        this.cameraController.setTargetModel(this.leftBoxer.model);
      }
      this.currentCameraViewNumber++;
      if (this.currentCameraViewNumber === viewsNames.length * 2) {
        this.currentCameraViewNumber = 0;
        this.mode = 'stop';
      }
    }

    run() {
      this.mode = 'run';
    }
}

export default DuelController;
