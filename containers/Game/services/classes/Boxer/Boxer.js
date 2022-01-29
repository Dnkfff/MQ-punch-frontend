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
    @param params.animationMixer Three.js animation mixer
    @param params.animationActions Three.js animation actions array
    @param params.idleAnimations an object of idle animation names for the lower and the upper body
  */
  constructor({ model, animationMixer, animationActions, idleAnimations }) {
    this.model = model;
    this.animationMixer = animationMixer;
    this.animationActions = animationActions;
    this.lowerBodyIdleAnimation = idleAnimations.lower;
    this.upperBodyIdleAnimation = idleAnimations.upper;
    this.currentLowerBodyAnimationName = this.lowerBodyIdleAnimation;
    this.currentUpperBodyAnimationName = this.upperBodyIdleAnimation;
    this.leadingSide = "right";
    this.movingDirection = new Vector3(0.0, 0.0, 0.0);
    this.movingStage = 1.0;
  }

  /**
    @summary Animates the model
    @description Updates animationMixer with deltaTime, switches to idle animations if requested are finished.
    @param deltaTime time in seconds passed since the last call
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

    // move model according to current direction and update stage of the move
    if (this.movingStage < 1.0) {
      const deltaStage = deltaTime / duelParameters.moveDuration;

      const deltaPosition = this.movingDirection.clone();
      deltaPosition.multiplyScalar(deltaStage);

      this.model.position.add(deltaPosition);

      this.movingStage += deltaStage;
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

    // animation transition
    this.animationActions[name].reset();
    this.animationActions[name].fadeIn(transitionDuration);
    this.animationActions[name].play();

    if (
      (type === "lower" || type === "whole") &&
      this.currentLowerBodyAnimationName !== name
    ) {
      // if the animation have changed
      lowerBodyAnimationAction.fadeOut(transitionDuration);
      this.currentLowerBodyAnimationName = name;
    }
    if (
      (type === "upper" || type === "whole") &&
      this.currentUpperBodyAnimationName !== name
    ) {
      // if the animation have changed
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

    // mirror along the X-axis
    this.model.position.x *= -1.0;
    this.model.rotation.y *= -1.0;
    this.model.applyMatrix4(new Matrix4().makeScale(-1.0, 1.0, 1.0));
  }

  /**
    @summary Moves the model on canvas
    @description The function moves the boxer model handling collisions with the canvas.
    @param direction model move direction
  */
  move(direction) {
    let boxerMoveVector = new Vector3(
      Math.sin(this.model.rotation.y),
      0.0,
      Math.cos(this.model.rotation.y)
    );
    boxerMoveVector.multiplyScalar(
      boxerParameters.scale * boxerParameters.stepSize
    );

    const rotationAxisVector = new Vector3(0.0, 1.0, 0.0);

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
}

export default Boxer;
