import { Matrix4 } from 'three';

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

    this.model.position.x *= -1;
    this.model.rotation.y *= -1;
    this.model.applyMatrix4(new Matrix4().makeScale(-1, 1, 1));
  }
}

export default Boxer;
