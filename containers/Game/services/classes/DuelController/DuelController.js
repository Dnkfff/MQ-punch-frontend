/** @module containers/Game/services/classes/DuelContoller/DuelContoller */

import { Vector3 } from 'three';

import { switchBoxerLeadingSide, moveBoxer } from './duelAlgorithms';

import duelControllerParameters from '../../constants/duelControllerParameters';
import boxerParameters from '../../constants/boxerParameters';
import ringParameters from '../../constants/ringParameters';
import viewNames from '../../constants/viewNames';

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

    this.leftBoxerSlowMotionStartLeadingSide = '';
    this.rightBoxerSlowMotionStartLeadingSide = '';

    this.currentTime = 0.0;
    this.mode = 'stop';

    this.cameraController = cameraController;
    this.currentCameraViewNumber = 0;
    this.winner = duelScenario.winner;
  }

  /**
    @summary Follows the duelScenario
    @description Requests boxer animations and moves boxers,
    writes passed movements from the duelScenario to the special list
    for slowmotion mode.
    @param deltaTime time in seconds passed since the last call
  */
  act(deltaTime) {
    // if runs normally or in slow motion
    if (this.mode !== 'stop') {
      // decreasing the speed if in slow motion
      if (this.mod === 'slowmotion') {
        deltaTime *= duelControllerParameters.slowMotionSpeedMultiplier;
      }

      // updating current time
      this.currentTime += deltaTime;

      // function to animate given boxer
      const animateBoxer = (boxer, opponent, boxerMovements, finishedBoxerMovements) => {
        // if next movement has started
        if (boxerMovements.length > 0 && boxerMovements[0].startTime <= this.currentTime) {
          // getting the first movement from the list
          const boxerMovement = boxerMovements.shift();

          // if not in slow motion
          if (this.mode === 'run') {
            // remembering positions and leading sides of boxers before slow motion
            if (boxerMovements.length + 1 <= duelControllerParameters.slowMotionMovementsNumber) {
              if (boxer === this.leftBoxer) {
                this.leftBoxerSlowMotionStartPosition = boxer.model.position.clone();
                this.leftBoxerSlowMotionStartLeadingSide = boxer.leadingSide;
              } else {
                this.rightBoxerSlowMotionStartPosition = boxer.model.position.clone();
                this.rightBoxerSlowMotionStartLeadingSide = boxer.leadingSide;
              }
            }

            // adding the movement to the list of slow motion movements
            finishedBoxerMovements.push(boxerMovement);
          }

          // if the movement is for the whole body at once
          if (boxerMovement.name.whole !== undefined) {
            // requesting the animation
            boxer.requestAnimation(boxerMovement.name.whole, 'whole', false);

            // making the boxer switch his leading side if the movement requires it
            switchBoxerLeadingSide(boxer, boxerMovement);
          }

          // if the movement is for the lower and the upper body separately
          else {
            // requesting animations
            const missOffensiveMovement =
              boxerMovement.miss &&
              (boxerMovement.type === 'bruteForce' || boxerMovement.type === 'deveptive');
            boxer.requestAnimation(boxerMovement.name.lower, 'lower', false);
            boxer.requestAnimation(boxerMovement.name.upper, 'upper', missOffensiveMovement);

            // making the boxer make a step if the movement requires it
            moveBoxer(boxer, opponent, boxerMovement);
          }
        }
      };

      const collideBoxersWithEachOther = () => {
        // calculating a vector from the left boxer to the right one
        const leftToRightDir = new Vector3();
        leftToRightDir.subVectors(this.rightBoxer.model.position, this.leftBoxer.model.position);

        // calculating a half of the distance needed to insert
        const deltaDistanceToInsert =
          -(
            boxerParameters.scale *
              boxerParameters.idealDistance *
              (1.0 - boxerParameters.idealDistanceDeviation) -
            leftToRightDir.length()
          ) / 2.0;

        // inserting distance if needed
        if (deltaDistanceToInsert < 0.0) {
          leftToRightDir.normalize();

          leftToRightDir.multiplyScalar(deltaDistanceToInsert);
          this.leftBoxer.model.position.add(leftToRightDir);

          leftToRightDir.multiplyScalar(-1.0);
          this.rightBoxer.model.position.add(leftToRightDir);
        }

        // calculating a half of the distance needed to cut
        const deltaDistanceToCut =
          -(
            boxerParameters.scale *
              boxerParameters.idealDistance *
              (1.0 + boxerParameters.idealDistanceDeviation) -
            leftToRightDir.length()
          ) / 2.0;

        // cutting distance if needed
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

        // handling collision detection and response
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

      // assigning next movements to boxers
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

      // animating and moving boxers
      this.leftBoxer.animate(deltaTime);
      this.rightBoxer.animate(deltaTime);

      // making boxers keep minimal distance
      collideBoxersWithEachOther();

      // handling boxers collisions with the ring
      collideBoxerWithRing(this.leftBoxer);
      collideBoxerWithRing(this.rightBoxer);

      // making boxers face each other
      this.leftBoxer.face(this.rightBoxer);
      this.rightBoxer.face(this.leftBoxer);

      // if all the movements have ended
      if (this.leftBoxerMovements.length === 0) {
        // preparing for slow motion after cooldown
        setTimeout(this.prepareSlowMotion(), duelControllerParameters.slowMotionCooldownDuration);
      }
    }
  }

  /**
    @summary Prepares boxer movements lists, positions
    and sets execution mode to slowmotion
  */
  prepareSlowMotion() {
    // setting the mode to "slowmotion"
    this.mode = 'slowmotion';

    // setting boxers previously stored positions
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

    // setting boxers previously stored leading sides
    if (this.leftBoxer.leadingSide !== this.leftBoxerSlowMotionStartLeadingSide) {
      this.leftBoxer.switchLeadingSide();
    }
    if (this.rightBoxer.leadingSide !== this.rightBoxerSlowMotionStartLeadingSide) {
      this.rightBoxer.switchLeadingSide();
    }

    // pushing specified amount of movements from the end to boxers movements
    for (let i = 0; i < duelControllerParameters.slowMotionMovementsNumber; ++i) {
      this.leftBoxerMovements.push(this.finishedLeftBoxerMovements[i]);
      this.rightBoxerMovements.push(this.finishedRightBoxerMovements[i]);
    }

    // setting current time to minimal of boxers first movements
    this.currentTime = Math.min(
      this.finishedLeftBoxerMovements[0].startTime,
      this.finishedRightBoxerMovements[0].startTime
    );

    // setting camera mode to fixed and switching camera view
    this.cameraController.enableFreeMode(false);
    this.cameraController.setView(viewNames[Math.floor(this.currentCameraViewNumber / 2)]);

    const numberIsPair = this.currentCameraViewNumber % 2 === 0;
    const leftBoxerIsWinner = this.winner === 'left';

    // if camera view number is pair NXOR left boxer is winne
    if (numberIsPair === leftBoxerIsWinner) {
      // setting camera controller target to the right boxer model
      this.cameraController.setTarget(this.rightBoxer.model);
    }

    // if camera view number is pair XOR left boxer is winne
    else {
      // setting camera controller target to the left boxer model
      this.cameraController.setTarget(this.leftBoxer.model);
    }

    // update camera view number
    this.currentCameraViewNumber++;

    // if all the views have ended
    if (this.currentCameraViewNumber === viewNames.length * 2) {
      this.currentCameraViewNumber = 0;
      this.mode = 'stop';
    }
  }

  /**
    @summary Sets execution mode to run
  */
  run() {
    // setting the mode to "run"
    this.mode = 'run';

    // making a pause before starting
    this.currentTime = -duelControllerParameters.warmupDuration;
  }
}

export default DuelController;
