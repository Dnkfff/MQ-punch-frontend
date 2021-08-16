import boxerParameters from '../../constants/boxerParameters';


class Boxer {
  constructor(model, animationMixer, animationActions) {
    this.model = model;
    this.animationMixer = animationMixer;
    this.animationActions = animationActions;
    this.currentAnimationName = 'warming-up';
  }

  animate(deltaTime) {
    this.animationMixer.update(deltaTime);
    if (!this.animationActions[this.currentAnimationName].isRunning()) {
      this.requestAnimation('fighting-idle');
    }
  }

  requestAnimation(name) {
    if (name in this.animationActions) {
      if (name !== this.currentAnimationName) {
        this.animationActions[name].reset();
        this.animationActions[name].crossFadeFrom(this.animationActions[this.currentAnimationName], 0.5);
        this.animationActions[name].play();
        this.currentAnimationName = name;
      } else if (!this.animationActions[this.currentAnimationName].isRunning()) {
        this.animationActions[name].reset();
        this.animationActions[name].play();
      }
    }
  }
}

export default Boxer;
