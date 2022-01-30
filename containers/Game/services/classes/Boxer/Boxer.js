/** @module containers/Game/services/classes/Boxer/Boxer */

import { Matrix4, Vector3 } from "three";

import boxerParameters from "../../constants/boxerParameters";
import duelParameters from "../../constants/duelParameters";

/**
  @summary The Boxer class
  @description Initializes WebGL scene, boxers, skybox, camera controller,
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
    @summary Animates the boxer
    @description Updates animationMixer with deltaTime, switches to idle animation if the requested one has finished.
    @param deltaTime time in seconds passed since the last call
  */
  animate(deltaTime) {
    // update animation stage
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
      this.requestAnimation(this.upperBodyIdleAnimation, "upper", false);
    }

    // movement boxer according to current direction and update stage of the movement
    if (this.movingStage < 1.0) {
      const deltaStage = deltaTime / duelParameters.movementDuration;

      const deltaPosition = this.movingDirection.clone();
      deltaPosition.multiplyScalar(deltaStage);

      this.model.position.add(deltaPosition);

      this.movingStage += deltaStage;
    }
  }

  /**
    @summary Requests an animation with transition (blending)
    @description Fades out current animation and fades in the requested one.
    @param name requested animation name
    @param type for the lower, the upper or the whole body
  */
  requestAnimation(name, type, miss) {
    const transitionDuration = boxerParameters.animationTransitionDuration;
    const lowerBodyAnimationAction =
      this.animationActions[this.currentLowerBodyAnimationName];
    const upperBodyAnimationAction =
      this.animationActions[this.currentUpperBodyAnimationName];

    // if boxer has missed the hit
    if (type === "upper" && miss === true) {
      name += "-miss";
    }

    // start animation
    this.animationActions[name].reset();
    this.animationActions[name].play();

    // if the animation has changed
    if (type === "whole" && this.currentLowerBodyAnimationName !== name) {
      // for the whole body
      // animation transition
      this.animationActions[name].fadeIn(transitionDuration);
      lowerBodyAnimationAction.fadeOut(transitionDuration);
      upperBodyAnimationAction.fadeOut(transitionDuration);

      this.currentLowerBodyAnimationName = name;
      this.currentUpperBodyAnimationName = name;
    } else if (
      type === "lower" &&
      this.currentLowerBodyAnimationName !== name
    ) {
      // for the lower body
      // animation transition
      this.animationActions[name].fadeIn(transitionDuration);
      lowerBodyAnimationAction.fadeOut(transitionDuration);

      this.currentLowerBodyAnimationName = name;
    } else if (
      type === "upper" &&
      this.currentUpperBodyAnimationName !== name
    ) {
      // for the upper body
      // animation transition
      this.animationActions[name].fadeIn(transitionDuration);
      upperBodyAnimationAction.fadeOut(transitionDuration);

      this.currentUpperBodyAnimationName = name;
    }
  }

  /**
    @summary Switches the leading side
    @description Mirrors the model.
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
    @summary Moves the boxer
    @description Moves the boxer at specified direction with specified step length coefficient.
    @param direction movement direction
    @param coefficient step coefficient
  */
  move(direction, coefficient) {
    direction.applyAxisAngle(new Vector3(0.0, 1.0, 0.0), this.model.rotation.y);
    direction.normalize();
    direction.multiplyScalar(
      coefficient * boxerParameters.scale * boxerParameters.stepSize
    );

    this.movingDirection = direction;
    this.movingStage = 0.0;
  }

  /**
    @summary Makes boxer face another boxer
    @param opponent boxer's opponent
  */
  face(opponent) {
    const dirToOpponent = new Vector3();
    dirToOpponent.subVectors(opponent.model.position, this.model.position);

    let angleY = Math.atan2(dirToOpponent.x, dirToOpponent.z);

    this.model.rotation.y = angleY;
  }

  /**
    @summary Returns distance between two boxers
    @param opponent boxer's opponent
    @returns distance to the opponent
  */
  distanceTo(opponent) {
    return this.model.position.distanceTo(opponent.model.position);
  }
}

export default Boxer;
