/** @module containers/Game/services/classes/Boxer/Boxer */

import { Matrix4, Vector3 } from "three";

import boxerParameters from "../../constants/boxerParameters";
import duelParameters from "../../constants/duelParameters";

/**
  @summary The Boxer class
  @description Initializes scene, boxers, skybox, camera controller,
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
    @param params.animationMixer animation mixer
    @param params.animationActions animation actions array
    @param params.idleAnimations The object of idle animation names
    for the lower and the upper body
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

    this.rotationDelta = 0.0;
    this.rotatingStage = 1.0;
  }

  /**
    @summary Animates the boxer
    @description Updates animationMixer with deltaTime, switches to idle animation
    if the requested one has finished.
    @param deltaTime time in seconds passed since the last call
  */
  animate(deltaTime) {
    // updating animation stage
    this.animationMixer.update(deltaTime);

    // setting the lower body animation if needed
    const currentLowerBodyAnimationIsRunning =
      this.animationActions[this.currentLowerBodyAnimationName].isRunning();
    if (!currentLowerBodyAnimationIsRunning) {
      this.requestAnimation(this.lowerBodyIdleAnimation, "lower");
    }

    // setting the upper body animation if needed
    const currentUpperBodyAnimationIsRunning =
      this.animationActions[this.currentUpperBodyAnimationName].isRunning();
    if (!currentUpperBodyAnimationIsRunning) {
      this.requestAnimation(this.upperBodyIdleAnimation, "upper", false);
    }

    // moving boxer according to current direction and moving stage
    if (this.movingStage < 1.0) {
      // calculating delta stage of the movement
      const deltaStage = deltaTime / duelParameters.movementDuration;

      // calculating delta position
      const deltaPosition = this.movingDirection.clone();
      deltaPosition.multiplyScalar(deltaStage);

      // moving the model onto delta position
      this.model.position.add(deltaPosition);

      // updating stage of the movement
      this.movingStage += deltaStage;
    }

    // rotating boxer according to current rotating stage
    if (this.rotatingStage < 1.0) {
      // calculating delta stage of the rotation
      const deltaStage = deltaTime / duelParameters.movementDuration;

      // calculating delta rotation
      let deltaRotation = duelParameters.missAngle * deltaStage;

      // if it is the second half of rotation
      // reverse delta rotation
      if (this.rotatingStage >= 0.5) {
        deltaRotation *= -1.0;
      }

      // rotating the model onto delta rotation
      this.rotationDelta += deltaRotation;

      // updating stage of the rotation
      this.rotatingStage += deltaStage;
    }

    // making sure there is no residual delta rotation
    else {
      this.rotationDelta = 0.0;
    }
  }

  /**
    @summary Requests an animation with transition (blending)
    @description Fades out current animation and fades in the requested one.
    @param name requested animation name
    @param type for the lower, the upper or the whole body
    @param miss if the boxer has missed attack or defense
  */
  requestAnimation(name, type, miss) {
    // getting some variables
    const transitionDuration = boxerParameters.animationTransitionDuration;
    const lowerBodyAnimationAction =
      this.animationActions[this.currentLowerBodyAnimationName];
    const upperBodyAnimationAction =
      this.animationActions[this.currentUpperBodyAnimationName];

    // if boxer has missed an offensive movement
    if (miss) {
      // rotating the boxer so he will miss the hit
      this.rotatingStage = 0.0;
    }

    // starting animation
    this.animationActions[name].reset();
    this.animationActions[name].play();

    // if the animation has changed
    // for the whole body
    if (type === "whole" && this.currentLowerBodyAnimationName !== name) {
      // making animation transition
      this.animationActions[name].fadeIn(transitionDuration);
      lowerBodyAnimationAction.fadeOut(transitionDuration);
      upperBodyAnimationAction.fadeOut(transitionDuration);

      // setting animations names
      this.currentLowerBodyAnimationName = name;
      this.currentUpperBodyAnimationName = name;
    }

    // for the lower body
    else if (type === "lower" && this.currentLowerBodyAnimationName !== name) {
      // making animation transition
      this.animationActions[name].fadeIn(transitionDuration);
      lowerBodyAnimationAction.fadeOut(transitionDuration);

      // setting animation name
      this.currentLowerBodyAnimationName = name;
    }

    // for the upper body
    else if (type === "upper" && this.currentUpperBodyAnimationName !== name) {
      // making animation transition
      this.animationActions[name].fadeIn(transitionDuration);
      upperBodyAnimationAction.fadeOut(transitionDuration);

      // setting animation name
      this.currentUpperBodyAnimationName = name;
    }
  }

  /**
    @summary Switches the leading side
    @description Mirrors the model.
  */
  switchLeadingSide() {
    // switching the leading side
    if (this.leadingSide === "left") {
      this.leadingSide = "right";
    } else {
      this.leadingSide = "left";
    }

    // mirroring along the X-axis
    this.model.position.x *= -1.0;
    this.model.rotation.y *= -1.0;
    this.model.applyMatrix4(new Matrix4().makeScale(-1.0, 1.0, 1.0));
  }

  /**
    @summary Moves the boxer
    @description Moves the boxer at specified direction
    with specified step length coefficient.
    @param direction movement direction
    @param coefficient step coefficient
  */
  move(direction, coefficient) {
    // applying model rotation to the given local direction
    direction.applyAxisAngle(new Vector3(0.0, 1.0, 0.0), this.model.rotation.y);

    // applying size coefficient to the given direction
    direction.normalize();
    direction.multiplyScalar(
      coefficient * boxerParameters.scale * boxerParameters.stepSize
    );

    // setting moving direction and stage
    this.movingDirection = direction;
    this.movingStage = 0.0;
  }

  /**
    @summary Makes boxer face another boxer
    @param opponent boxer's opponent
  */
  face(opponent) {
    // calculating direction from the boxer to his opponent
    const dirToOpponent = new Vector3();
    dirToOpponent.subVectors(opponent.model.position, this.model.position);

    // calculating an angle between the direction and Z-axis
    let angleY = Math.atan2(dirToOpponent.x, dirToOpponent.z);

    // adding rotation delta to rotate the boxer
    // if he has missed offensive movement
    angleY += this.rotationDelta;

    // setting the model Y-rotation angle
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
