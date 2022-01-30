/** @module containers/Game/services/classes/DuelContoller/DuelContoller */

import { Vector3 } from "three";

import { switchBoxerLeadingSide, moveBoxer } from "./duelAlgorithms";

import duelParameters from "../../constants/duelParameters";
import boxerParameters from "../../constants/boxerParameters";
import ringParameters from "../../constants/ringParameters";
import viewNames from "../../constants/viewNames";

/**
  @summary The DuelContoller class
  @description Requests animations for each boxer
  and views for the cameraController according to the duelScenario
  at each moment of time.
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
    this.leftBoxerMovements = duelScenario.leftBoxerMovements.slice();
    this.rightBoxerMovements = duelScenario.rightBoxerMovements.slice();
    this.finishedLeftBoxerMovements = [];
    this.finishedRightBoxerMovements = [];
    this.leftBoxerSlowMotionStartPosition = new Vector3();
    this.rightBoxerSlowMotionStartPosition = new Vector3();
    this.leftBoxerSlowMotionStartLeadingSide = "";
    this.rightBoxerSlowMotionStartLeadingSide = "";
    this.currentTime = 0.0;
    this.mode = "stop";
    this.cameraController = cameraController;
    this.currentCameraViewNumber = 0;
    this.winner = duelScenario.winner;
  }

  /**
    @summary Follows the duelScenario
    @description Requests boxer animations and moves boxers,
    writes passed movements from the duelScenario to the special list for slowmotion mode.
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

      const animateBoxer = (
        boxer,
        opponent,
        boxerMovements,
        finishedBoxerMovements
      ) => {
        if (
          boxerMovements.length > 0 &&
          boxerMovements[0].startTime <= this.currentTime
        ) {
          // if new movement has started
          const boxerMovement = boxerMovements.shift(); // get the first movement from the list

          if (this.mode === "run") {
            // if not in slow motion
            // remember positions and leading sides of boxers before slow motion
            if (
              boxerMovements.length + 1 <=
              duelParameters.slowMotionMovementsNumber
            ) {
              if (boxer === this.leftBoxer) {
                this.leftBoxerSlowMotionStartPosition =
                  boxer.model.position.clone();
                this.leftBoxerSlowMotionStartLeadingSide = boxer.leadingSide;
              } else {
                this.rightBoxerSlowMotionStartPosition =
                  boxer.model.position.clone();
                this.rightBoxerSlowMotionStartLeadingSide = boxer.leadingSide;
              }
            }

            // add the movement to the list of slow motion movements
            finishedBoxerMovements.push(boxerMovement);
          }

          if (boxerMovement.movement.whole !== undefined) {
            // if the movement is for the whole body at once
            boxer.requestAnimation(boxerMovement.movement.whole, "whole");

            // make the boxer switch his leading side if the movement requires it
            switchBoxerLeadingSide(boxer, boxerMovement);
          } else {
            // if the movement is for the lower and the upper body separately
            boxer.requestAnimation(boxerMovement.movement.lower, "lower");
            boxer.requestAnimation(
              boxerMovement.movement.upper,
              "upper",
              boxerMovement.miss
            );

            // make the boxer make a step if the movement requires it
            moveBoxer(boxer, opponent, boxerMovement);
          }
        }
      };

      const collideBoxersWithEachOther = () => {
        const leftToRightDir = new Vector3();
        leftToRightDir.subVectors(
          this.rightBoxer.model.position,
          this.leftBoxer.model.position
        );

        // half of the distance needed to insert
        const deltaDistanceToInsert =
          -(
            boxerParameters.scale *
              boxerParameters.idealDistance *
              (1.0 - boxerParameters.idealDistanceDeviation) -
            leftToRightDir.length()
          ) / 2.0;

        if (deltaDistanceToInsert < 0.0) {
          leftToRightDir.normalize();
          leftToRightDir.multiplyScalar(deltaDistanceToInsert);
          this.leftBoxer.model.position.add(leftToRightDir);
          leftToRightDir.multiplyScalar(-1.0);
          this.rightBoxer.model.position.add(leftToRightDir);
        }

        // half of the distance needed to cut
        const deltaDistanceToCut =
          -(
            boxerParameters.scale *
              boxerParameters.idealDistance *
              (1.0 + boxerParameters.idealDistanceDeviation) -
            leftToRightDir.length()
          ) / 2.0;

        if (deltaDistanceToCut > 0.0) {
          leftToRightDir.normalize();
          leftToRightDir.multiplyScalar(deltaDistanceToCut);
          this.leftBoxer.model.position.add(leftToRightDir);
          leftToRightDir.multiplyScalar(-1.0);
          this.rightBoxer.model.position.add(leftToRightDir);
        }
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

      // assign next movements to boxers
      animateBoxer(
        this.leftBoxer,
        this.rightBoxer,
        this.leftBoxerMovements,
        this.finishedLeftBoxerMovements
      );
      animateBoxer(
        this.rightBoxer,
        this.leftBoxer,
        this.rightBoxerMovements,
        this.finishedRightBoxerMovements
      );

      // animate and movement boxers
      this.leftBoxer.animate(deltaTime);
      this.rightBoxer.animate(deltaTime);

      // make boxers keep minimal distance
      collideBoxersWithEachOther();

      // handle boxers collisions with the ring
      collideBoxerWithRing(this.leftBoxer);
      collideBoxerWithRing(this.rightBoxer);

      // make boxers face each other
      this.leftBoxer.face(this.rightBoxer);
      this.rightBoxer.face(this.leftBoxer);

      if (
        this.leftBoxerMovements.length === 0 &&
        this.rightBoxerMovements.length === 0
      ) {
        // if all the movements have ended
        // prepare for slow motion after cooldown
        setTimeout(
          this.prepareSlowMotion(),
          duelParameters.slowMotionCooldownDuration
        );
      }
    }
  }

  /**
    @summary Prepares boxer movements lists, positions and sets execution mode to slowmotion
  */
  prepareSlowMotion() {
    this.mode = "slowmotion";

    // set boxers previously stored positions and leading sides
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

    if (
      this.leftBoxer.leadingSide !== this.leftBoxerSlowMotionStartLeadingSide
    ) {
      this.leftBoxer.switchLeadingSide();
    }
    if (
      this.rightBoxer.leadingSide !== this.rightBoxerSlowMotionStartLeadingSide
    ) {
      this.rightBoxer.switchLeadingSide();
    }

    // push specified amount of movements from the end to boxers movements
    for (let i = 0; i < duelParameters.slowMotionMovementsNumber; i++) {
      this.leftBoxerMovements.push(this.finishedLeftBoxerMovements[i]);
      this.rightBoxerMovements.push(this.finishedRightBoxerMovements[i]);
    }

    // set current time to minimal of boxers first movements
    this.currentTime = Math.min(
      this.finishedLeftBoxerMovements[0].startTime,
      this.finishedRightBoxerMovements[0].startTime
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
      this.cameraController.setTarget(this.rightBoxer.model);
    } else {
      // xor
      this.cameraController.setTarget(this.leftBoxer.model);
    }
    this.currentCameraViewNumber++;
    // if all the views have ended
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
