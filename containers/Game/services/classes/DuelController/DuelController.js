/** @module containers/Game/services/classes/DuelContoller/DuelContoller */

import { switchBoxerLeadingSide, moveBoxer } from "./duelAlgorithms";

import duelParameters from "../../constants/duelParameters";
import boxerParameters from "../../constants/boxerParameters";
import ringParameters from "../../constants/ringParameters";
import viewNames from "../../constants/viewNames";
import { Vector3 } from "three";

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
    this.leftBoxerSlowMotionStartPosition = new Vector3();
    this.rightBoxerSlowMotionStartPosition = new Vector3();
    this.currentTime = 0.0;
    this.mode = "stop";
    this.cameraController = cameraController;
    this.currentCameraViewNumber = 0;
    this.winner = duelScenario.winner;
  }

  /**
    @summary Follows the duelScenario
    @description Requests boxer animations and moves boxers,
    writes passed moves from the duelScenario to the special list for slowmotion mode.
    @param deltaTime time in seconds passed since the last call
  */
  act(deltaTime) {
    if (this.mode !== "stop") {
      // if runs normally or in slow motion
      if (this.mod === "slowmotion") {
        // decrease speed if in slow motion
        deltaTime *= duelParameters.slowMotionSpeedMultiplier;
      }

      // update current time
      this.currentTime += deltaTime;

      const animateBoxer = (boxerMoves, finishedBoxerMoves, boxer) => {
        if (
          boxerMoves.length > 0 &&
          boxerMoves[0].startTime <= this.currentTime
        ) {
          // if new move have started
          const boxerMove = boxerMoves.shift(); // get the first move from the list

          if (this.mode === "run") {
            // if not in slow motion
            // remember positions of boxers before slow motion
            if (boxerMoves.length + 1 <= duelParameters.slowMotionMovesNumber) {
              if (boxer === this.leftBoxer) {
                this.leftBoxerSlowMotionStartPosition =
                  boxer.model.position.clone();
              } else {
                this.rightBoxerSlowMotionStartPosition =
                  boxer.model.position.clone();
              }
            }

            // add the move to the list of slow motion moves
            finishedBoxerMoves.push(boxerMove);
          }

          if (boxerMove.move.whole !== undefined) {
            // if the move is for the whole body at once
            boxer.requestAnimation(boxerMove.move.whole, "whole");

            // make the boxer switch his leading side if the move requires it
            switchBoxerLeadingSide(boxer, boxerMove);
          } else {
            // if the move is for the lower and the upper body separately
            boxer.requestAnimation(boxerMove.move.lower, "lower");
            boxer.requestAnimation(boxerMove.move.upper, "upper");

            // make the boxer make a step if the move requires it
            moveBoxer(boxer, boxerMove);
          }
        }
      };

      const collideBoxersWithEachOther = () => {
        const leftToRightDir = new Vector3();
        leftToRightDir.subVectors(
          this.rightBoxer.model.position,
          this.leftBoxer.model.position
        );

        // half of the distance needed to cut
        const deltaDistance =
          -(
            boxerParameters.scale * boxerParameters.idealDistance -
            leftToRightDir.length()
          ) / 2.0;

        leftToRightDir.normalize();
        leftToRightDir.multiplyScalar(deltaDistance);
        this.leftBoxer.model.position.add(leftToRightDir);
        leftToRightDir.multiplyScalar(-1.0);
        this.rightBoxer.model.position.add(leftToRightDir);
      };

      const collideBoxerWithRing = (boxer) => {
        // calculating ring borders along X- and Z-axes
        const border = boxerParameters.scale * boxerParameters.stepSize;
        const borders = {
          x: {
            min: border,
            max: ringParameters.canvas.width - border,
          },
          z: {
            min: border,
            max: ringParameters.canvas.width - border,
          },
        };

        // collision detection and response
        if (boxer.model.position.x < borders.x.min) {
          boxer.model.position.x = borders.x.min;
        } else if (boxer.model.position.x > borders.x.max) {
          boxer.model.position.x = borders.x.max;
        }

        if (boxer.model.position.z < borders.z.min) {
          boxer.model.position.z = borders.z.min;
        } else if (boxer.model.position.z > borders.z.max) {
          boxer.model.position.z = borders.z.max;
        }
      };

      // assign next moves to boxers
      animateBoxer(
        this.leftBoxerMoves,
        this.finishedLeftBoxerMoves,
        this.leftBoxer
      );
      animateBoxer(
        this.rightBoxerMoves,
        this.finishedRightBoxerMoves,
        this.rightBoxer
      );

      // animate and move boxers
      this.leftBoxer.animate(deltaTime);
      this.rightBoxer.animate(deltaTime);

      // make boxers keep ideal distance
      collideBoxersWithEachOther();

      // handle boxers' collisions with the ring
      collideBoxerWithRing(this.leftBoxer);
      collideBoxerWithRing(this.rightBoxer);

      // make boxers face each other
      this.leftBoxer.face(this.rightBoxer);
      this.rightBoxer.face(this.leftBoxer);

      if (
        this.leftBoxerMoves.length === 0 &&
        this.rightBoxerMoves.length === 0
      ) {
        // if all the moves have ended
        // prepare for slow motion after cooldown
        setTimeout(
          this.prepareSlowMotion(),
          duelParameters.slowMotionCooldownDuration
        );
      }
    }
  }

  /**
    @summary Prepares boxer moves lists and sets execution mode to slowmotion
  */
  prepareSlowMotion() {
    this.mode = "slowmotion";

    // set boxers previously stored positions
    this.leftBoxer.model.position.set(
      this.leftBoxerSlowMotionStartPosition.x,
      this.leftBoxerSlowMotionStartPosition.y,
      this.leftBoxerSlowMotionStartPosition.z
    );
    this.rightBoxer.model.position.set(
      this.rightBoxerSlowMotionStartPosition.x,
      this.rightBoxerSlowMotionStartPosition.y,
      this.rightBoxerSlowMotionStartPosition.z
    );

    // push specified amount of moves from the end to boxers' moves
    for (let i = 0; i < duelParameters.slowMotionMovesNumber; i++) {
      this.leftBoxerMoves.push(this.finishedLeftBoxerMoves[i]);
      this.rightBoxerMoves.push(this.finishedRightBoxerMoves[i]);
    }

    // set current time to minimal of boxers' first moves
    this.currentTime = Math.min(
      this.finishedLeftBoxerMoves[0].startTime,
      this.finishedRightBoxerMoves[0].startTime
    );

    // switch camera view
    this.cameraController.setView(
      viewNames[Math.floor(this.currentCameraViewNumber / 2)]
    );
    // if the slow motion time number is pair switch camera's target
    const numberIsPair = this.currentCameraViewNumber % 2 === 0;
    const leftBoxerIsWinner = this.winner === "left";
    if (numberIsPair === leftBoxerIsWinner) {
      // nxor
      this.cameraController.setTargetModel(this.rightBoxer.model);
    } else {
      // xor
      this.cameraController.setTargetModel(this.leftBoxer.model);
    }
    this.currentCameraViewNumber++;
    // if the views have ended
    if (this.currentCameraViewNumber === viewNames.length * 2) {
      this.currentCameraViewNumber = 0;
      this.mode = "stop";
    }
  }

  /**
    @summary Sets execution mode to run
  */
  run() {
    this.mode = "run";
    // make a pause before starting
    this.currentTime = -duelParameters.warmupDuration;
  }
}

export default DuelController;
