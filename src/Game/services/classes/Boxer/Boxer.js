import { AnimationMixer, LoopOnce } from 'three';

import boxerParameters from '../../constants/boxerParameters';


class Boxer {
  constructor(model, animations) {
    this.model = model;
    this.animations = animations;
    this.animationMixer = new AnimationMixer(this.model);
  }

  animate(deltaTime) {
    this.animationMixer.update(deltaTime);
  }

  requestAnimation(name) {
    if (name in this.animations) {
      const animationAction = this.animationMixer.clipAction(this.animations[name]);
      animationAction.setLoop(LoopOnce);
      animationAction.play();
    }
  }
}

export default Boxer;
