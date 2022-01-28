/** @module containers/Game/services/classes/Boxer/Boxer */

import { Matrix4, Vector3 } from "three";

import boxerParameters from "../../constants/boxerParameters";
import duelParameters from "../../constants/duelParameters";

/**
  @summary The Boxer class
  @description Initializes Three.js scene (on WebGL), boxers, skybox, camera controller,
  ring environment, runs the duel scenario calculation algorithm.
  Then starts duel controller and renders scene objects.
  @class
*/
class Boxer {
  /**
    @summary Boxer constructor
    @constructor
    @param params
    @param params.model boxer model
    @param params.opponentModel opponent boxer model
    @param params.borders ring borders
    @param params.animationMixer Three.js animation mixer
    @param params.animationActions Three.js animation actions array
    @param params.idleAnimations an object of idle animation names for the lower and the upper body
  */
  constructor({
    model,
    opponentModel,
    borders,
    animationMixer,
    animationActions,
    idleAnimations,
  }) {
    this.model = model;
    this.opponentModel = opponentModel;
    this.animationMixer = animationMixer;
    this.animationActions = animationActions;
    this.lowerBodyIdleAnimation = idleAnimations.lower;
    this.upperBodyIdleAnimation = idleAnimations.upper;
    this.currentLowerBodyAnimationName = this.lowerBodyIdleAnimation;
    this.currentUpperBodyAnimationName = this.upperBodyIdleAnimation;
    this.leadingSide = "right";
    this.movingDirection = new Vector3(0.0, 0.0, 0.0);
    this.movingStage = 1.0;
    this.borders = borders;
  }

  /**
    @summary Animates the model
    @description Updates animationMixer with deltaTime, switches to idle animations if requested are finished.
    @param deltaTime time in ms passed since the last call
  */
  animate(deltaTime) {
    // update animation stage of model
    this.animationMixer.update(deltaTime);

    // set the lower body animation if needed
    const currentLowerBodyAnimationIsRunning =
      this.animationActions[this.currentLowerBodyAnimationName].isRunning();
    if (!currentLowerBodyAnimationIsRunning) {
      this.requestAnimation(this.lowerBodyIdleAnimation, "lower");
    }

    // set the upper body animation if needed
    const currentUpperBodyAnimationIsRunning =
      this.animationActions[this.currentUpperBodyAnimationName].isRunning();
    if (!currentUpperBodyAnimationIsRunning) {
      this.requestAnimation(this.upperBodyIdleAnimation, "upper");
    }

    // move model according to current direction
    if (this.movingStage < 1.0) {
      const deltaStage = deltaTime / duelParameters.moveDuration;

      const deltaPosition = this.movingDirection.clone();
      deltaPosition.multiplyScalar(deltaStage);

      this.model.position.add(deltaPosition);

      this.movingStage += deltaStage;

      // ring collision handling
      if (this.model.position.x < this.borders.x.min) {
        this.model.position.x = this.borders.x.min;
      } else if (this.model.position.x > this.borders.x.max) {
        this.model.position.x = this.borders.x.max;
      }
      if (this.model.position.z < this.borders.z.min) {
        this.model.position.z = this.borders.z.min;
      } else if (this.model.position.z > this.borders.z.max) {
        this.model.position.z = this.borders.z.max;
      }

      // boxer ideal distancing
      let vectorToOpponent = new Vector3();
      vectorToOpponent.subVectors(
        this.opponentModel.position,
        this.model.position
      );

      const deltaDistance =
        boxerParameters.scale * boxerParameters.idealDistance -
        vectorToOpponent.length();

      vectorToOpponent.normalize();
      vectorToOpponent.multiplyScalar(-deltaDistance);
      this.model.position.add(vectorToOpponent);
    }
  }

  /**
    @summary Requests an animation
    @description Fades in current animation and fades out the requested one with blending.
    @param name requested animation name
    @param type for the lower, the upper or the whole body
  */
  requestAnimation(name, type) {
    const transitionDuration = boxerParameters.animationTransitionDuration;
    const lowerBodyAnimationAction =
      this.animationActions[this.currentLowerBodyAnimationName];
    const upperBodyAnimationAction =
      this.animationActions[this.currentUpperBodyAnimationName];

    this.animationActions[name].reset();
    this.animationActions[name].fadeIn(transitionDuration);
    this.animationActions[name].play();

    if (
      (type === "lower" || type === "whole") &&
      this.currentLowerBodyAnimationName !== name
    ) {
      lowerBodyAnimationAction.fadeOut(transitionDuration);
      this.currentLowerBodyAnimationName = name;
    }
    if (
      (type === "upper" || type === "whole") &&
      this.currentUpperBodyAnimationName !== name
    ) {
      upperBodyAnimationAction.fadeOut(transitionDuration);
      this.currentUpperBodyAnimationName = name;
    }
  }

  /**
    @summary Switches the leading side
    @description Mirrors the model using matrix.
  */
  switchLeadingSide() {
    if (this.leadingSide === "left") {
      this.leadingSide = "right";
    } else {
      this.leadingSide = "left";
    }

    this.model.position.x *= -1.0;
    this.model.rotation.y *= -1.0;
    this.model.applyMatrix4(new Matrix4().makeScale(-1.0, 1.0, 1.0));
  }

  /**
    @summary Moves the model on canvas
    @description The function moves the boxer model handling collisions with the canvas.
    @param direction time in ms passed since the last call
    @param coefficient move vector length coefficient
  */
  move(direction) {
    // preparing variables
    let boxerMoveVector = new Vector3(
      Math.sin(this.model.rotation.y),
      0.0,
      Math.cos(this.model.rotation.y)
    );
    boxerMoveVector.multiplyScalar(
      boxerParameters.scale * boxerParameters.stepSize
    );
    const rotationAxisVector = new Vector3(0.0, 1.0, 0.0);

    // moving
    if (direction === "backward") {
      boxerMoveVector.applyAxisAngle(rotationAxisVector, Math.PI);
    } else if (direction === "left") {
      boxerMoveVector.applyAxisAngle(rotationAxisVector, Math.PI / 2.0);
    } else if (direction === "right") {
      boxerMoveVector.applyAxisAngle(rotationAxisVector, -Math.PI / 2.0);
    }
    this.movingDirection = boxerMoveVector;
    this.movingStage = 0.0;
  }

  /**
    @summary Makes the model face at another boxer's model
    @param anotherBoxer target boxer model
  */
  face(anotherBoxer) {
    this.model.lookAt(anotherBoxer.model.position);
  }

  /**
    @summary Returns distance between the model and the give one
    @param anotherBoxer target boxer model
    @returns distance to the given model
  */
  getDistance(anotherBoxer) {
    return this.model.position.distanceTo(anotherBoxer.model.position);
  }
}

export default Boxer;
