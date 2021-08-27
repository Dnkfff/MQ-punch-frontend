import { LoopRepeat } from 'three';

import animationsNames from '../../constants/animationsNames';


const ANIMATION_TRANSITION_DURATION = 0.1;


class Boxer {
  constructor(model, animationMixer, animationActions) {
    this.model = model;
    this.animationMixer = animationMixer;
    this.animationActions = animationActions;
    this.currentAnimationName = animationsNames[0];
    this.animationQueue = [];
  }

  animate(deltaTime) {
    this.animationMixer.update(deltaTime);

    const currentAnimationIsRunning = this.animationActions[this.currentAnimationName].isRunning();
    if (!currentAnimationIsRunning) {
      this.requestImmediateAnimation(this.animationQueue.length === 0 ? animationsNames[0] : this.animationQueue.shift());
    } else if (this.animationActions[this.currentAnimationName].loop === LoopRepeat && this.animationQueue.length !== 0) {
      this.requestImmediateAnimation(this.animationQueue.shift());
    }
  }

  requestImmediateAnimation(name) {
    const prepareAnimationClip = (name, enableAnimationTransition = false) => {
      this.animationActions[name].reset();
      if (enableAnimationTransition) {
        this.animationActions[name].crossFadeFrom(this.animationActions[this.currentAnimationName], ANIMATION_TRANSITION_DURATION);
      }
      this.animationActions[name].play();
    }

    if (name in this.animationActions) {
      const currentAnimationIsRunning = this.animationActions[this.currentAnimationName].isRunning();
      if (name !== this.currentAnimationName) {
        prepareAnimationClip(name, true);
        this.currentAnimationName = name;
      } else if (!currentAnimationIsRunning) {
        prepareAnimationClip(name, false);
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
