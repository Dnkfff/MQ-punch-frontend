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

    if (type === 'lower' || type === 'whole') {
      lowerBodyAnimationAction.fadeOut(transitionDuration);
      this.currentLowerBodyAnimationName = name;
    }
    if (type === 'upper' || type === 'whole') {
      upperBodyAnimationAction.fadeOut(transitionDuration);
      this.currentUpperBodyAnimationName = name;
    }
  }
}

export default Boxer;
