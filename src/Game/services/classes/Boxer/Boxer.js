import { LoopRepeat } from 'three';

import boxerParameters from '../../constants/boxerParameters';


class Boxer {
  constructor(model, animationMixer, animationActions) {
    this.model = model;
    this.animationMixer = animationMixer;
    this.animationActions = animationActions;
    this.currentAnimationName = 'warming-up';
    this.animationQueue = [];
  }

  animate(deltaTime) {
    this.animationMixer.update(deltaTime);
    if (this.animationActions[this.currentAnimationName].isRunning()) {
      if (this.animationActions[this.currentAnimationName].loop === LoopRepeat && this.animationQueue.length !== 0) {
        this.requestImmediateAnimation(this.animationQueue.shift());
      }
    } else {
      this.requestImmediateAnimation(this.animationQueue.length === 0 ? 'fighting-idle' : this.animationQueue.shift());
    }
  }

  requestImmediateAnimation(name) {
    if (name in this.animationActions) {
      if (name !== this.currentAnimationName) {
        this.animationActions[name].reset();
        this.animationActions[name].crossFadeFrom(this.animationActions[this.currentAnimationName], 0.1);
        this.animationActions[name].play();
        this.currentAnimationName = name;
      } else if (!this.animationActions[this.currentAnimationName].isRunning()) {
        this.animationActions[name].reset();
        this.animationActions[name].play();
      }
    }
  }

  requestAnimation(name) {
    this.animationQueue.push(name);
  }

  emptyAnimationQueue() {
    this.animationQueue = [];
  }
}

export default Boxer;
