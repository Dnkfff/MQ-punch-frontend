import { Matrix4, Vector3 } from 'three';

import boxerParameters from '../../constants/boxerParameters';


class Boxer {
  constructor({ model, animationMixer, animationActions, idleAnimations }) {
    this.model = model;
    this.animationMixer = animationMixer;
    this.animationActions = animationActions;
    this.lowerBodyIdleAnimation = idleAnimations.lower;
    this.upperBodyIdleAnimation = idleAnimations.upper;
    this.currentLowerBodyAnimationName = this.lowerBodyIdleAnimation;
    this.currentUpperBodyAnimationName = this.upperBodyIdleAnimation;
    this.leadingSide = 'right';
  }

  animate(deltaTime) {
    this.animationMixer.update(deltaTime);

    const currentLowerBodyAnimationIsRunning = this.animationActions[this.currentLowerBodyAnimationName].isRunning();
    if (!currentLowerBodyAnimationIsRunning) {
      this.requestAnimation(this.lowerBodyIdleAnimation, 'lower');
    }

    const currentUpperBodyAnimationIsRunning = this.animationActions[this.currentUpperBodyAnimationName].isRunning();
    if (!currentUpperBodyAnimationIsRunning) {
      this.requestAnimation(this.upperBodyIdleAnimation, 'upper');
    }
  }

  requestAnimation(name, type) {
    const transitionDuration = boxerParameters.animationTransitionDuration;
    const lowerBodyAnimationAction = this.animationActions[this.currentLowerBodyAnimationName];
    const upperBodyAnimationAction = this.animationActions[this.currentUpperBodyAnimationName];

    this.animationActions[name].reset();
    this.animationActions[name].fadeIn(transitionDuration);
    this.animationActions[name].play();

    if ((type === 'lower' || type === 'whole') && this.currentLowerBodyAnimationName !== name) {
      lowerBodyAnimationAction.fadeOut(transitionDuration);
      this.currentLowerBodyAnimationName = name;
    }
    if ((type === 'upper' || type === 'whole') && this.currentUpperBodyAnimationName !== name) {
      upperBodyAnimationAction.fadeOut(transitionDuration);
      this.currentUpperBodyAnimationName = name;
    }
  }

  switchLeadingSide() {
    if (this.leadingSide === 'left') {
      this.leadingSide = 'right';
    } else {
      this.leadingSide = 'left';
    }

    this.model.position.x *= -1.0;
    this.model.rotation.y *= -1.0;
    this.model.applyMatrix4(new Matrix4().makeScale(-1.0, 1.0, 1.0));
  }

  move(direction, borders, coefficient) {
    let boxerMoveVector = new Vector3(Math.sin(this.model.rotation.y), 0.0, Math.cos(this.model.rotation.y));
    boxerMoveVector.multiplyScalar(boxerParameters.scale * boxerParameters.stepSize * coefficient);
    const rotationAxisVector = new Vector3(0.0, 1.0, 0.0);

    if (direction === 'forward') {
      this.model.position.add(boxerMoveVector);
    } else if (direction === 'backward') {
      boxerMoveVector.applyAxisAngle(rotationAxisVector, Math.PI);
      this.model.position.add(boxerMoveVector);
    } else if (direction === 'left') {
      boxerMoveVector.applyAxisAngle(rotationAxisVector, Math.PI / 2.0);
      this.model.position.add(boxerMoveVector);
    } else if (direction === 'right') {
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

  face(anotherBoxer) {
    this.model.lookAt(anotherBoxer.model.position);
  }

  getDistance(anotherBoxer) {
    return this.model.position.distanceTo(anotherBoxer.model.position);
  }
}

export default Boxer;
