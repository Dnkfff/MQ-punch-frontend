import { idleAnimation } from '../../constants/animationsNames';
import boxerParameters from '../../constants/boxerParameters';


class Boxer {
  constructor(model, animationMixer, animationActions) {
    this.model = model;
    this.animationMixer = animationMixer;
    this.animationActions = animationActions;
    this.currentAnimationName = idleAnimation;
  }

  animate(deltaTime) {
    this.animationMixer.update(deltaTime);

    const currentAnimationIsRunning = this.animationActions[this.currentAnimationName].isRunning();
    if (!currentAnimationIsRunning) {
      this.requestImmediateAnimation(idleAnimation);
    }
  }

  requestImmediateAnimation(name) {
    this.animationActions[name].reset();
    this.animationActions[name].crossFadeFrom(this.animationActions[this.currentAnimationName], boxerParameters.animationTransitionDuration);
    this.animationActions[name].play();
    this.currentAnimationName = name;
  }
}

export default Boxer;
