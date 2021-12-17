/** @module containers/Game/services/classes/Boxer/Boxer */

import { Matrix4, Vector3 } from "three";

import boxerParameters from "../../constants/boxerParameters";

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
  }

  /**
    @summary Animates the model
    @description Updates animationMixer with deltaTime, switches to idle animations if requested are finished.
    @param deltaTime time in ms passed since the last call
  */
  animate(deltaTime) {
    this.animationMixer.update(deltaTime);

    const currentLowerBodyAnimationIsRunning =
      this.animationActions[this.currentLowerBodyAnimationName].isRunning();
    if (!currentLowerBodyAnimationIsRunning) {
      this.requestAnimation(this.lowerBodyIdleAnimation, "lower");
    }

    const currentUpperBodyAnimationIsRunning =
      this.animationActions[this.currentUpperBodyAnimationName].isRunning();
    if (!currentUpperBodyAnimationIsRunning) {
      this.requestAnimation(this.upperBodyIdleAnimation, "upper");
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
    @param borders time in ms passed since the last call
    @param coefficient in ms passed since the last call
  */
  move(direction, borders, coefficient) {
    let boxerMoveVector = new Vector3(
      Math.sin(this.model.rotation.y),
      0.0,
      Math.cos(this.model.rotation.y)
    );
    boxerMoveVector.multiplyScalar(
      boxerParameters.scale * boxerParameters.stepSize * coefficient
    );
    const rotationAxisVector = new Vector3(0.0, 1.0, 0.0);

    if (direction === "forward") {
      this.model.position.add(boxerMoveVector);
    } else if (direction === "backward") {
      boxerMoveVector.applyAxisAngle(rotationAxisVector, Math.PI);
      this.model.position.add(boxerMoveVector);
    } else if (direction === "left") {
      boxerMoveVector.applyAxisAngle(rotationAxisVector, Math.PI / 2.0);
      this.model.position.add(boxerMoveVector);
    } else if (direction === "right") {
      boxerMoveVector.applyAxisAngle(rotationAxisVector, -Math.PI / 2.0);
      this.model.position.add(boxerMoveVector);
    }

    if (this.model.position.x < borders.x.min) {
      this.model.position.x = borders.x.min;
    } else if (this.model.position.x > borders.x.max) {
      this.model.position.x = borders.x.max;
    }
    if (this.model.position.z < borders.z.min) {
      this.model.position.z = borders.z.min;
    } else if (this.model.position.z > borders.z.max) {
      this.model.position.z = borders.z.max;
    }
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
