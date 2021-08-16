import { AnimationMixer, LoopOnce, LoopRepeat } from 'three';
import { SkeletonUtils } from 'three-stdlib';

import { loadFBX } from '../algorithms/assetsLoaders';

import webGLParameters from '../constants/webGLParameters';
import ringParameters from '../constants/ringParameters';

import Boxer from '../classes/Boxer/Boxer';


const setupBoxers = async (scene) => {
  const boxers = [];
  const models = [];
  const animationMixers = [];
  const animationActions = [{}, {}];

  const modelsLoadingPromise = loadFBX('../../../../assets/models/ybot.fbx').then((model) => {
    const scaleCoefficient = ringParameters.ropes.height * 0.0075;

    model.traverse((obj) => {
      obj.layers.set(webGLParameters.layers.NORMAL);
    });

    models[0] = SkeletonUtils.clone(model);
    models[0].scale.set(scaleCoefficient, scaleCoefficient, scaleCoefficient);
    models[0].rotation.y = Math.PI / 2;
    models[0].position.set(ringParameters.canvas.width / 4, 0, ringParameters.canvas.width / 2);

    models[1] = SkeletonUtils.clone(model);
    models[1].scale.set(scaleCoefficient, scaleCoefficient, scaleCoefficient);
    models[1].rotation.y = -Math.PI / 2;
    models[1].position.set(ringParameters.canvas.width * 3 / 4, 0, ringParameters.canvas.width / 2);
  }).catch((error) => {
    console.log(error);
  });

  await modelsLoadingPromise.then(() => {
    scene.add(...models);

    animationMixers[0] = new AnimationMixer(models[0]);
    animationMixers[1] = new AnimationMixer(models[1]);
  }).catch((error) => {
    console.log(error);
  });

  const animationsNames = [
    'fighting-idle',
    // 'change-stand',
    // 'step-forward',
    // 'step-backward',
    // 'step-to-the-left',
    // 'step-to-the-right',
    // 'slip-left',
    // 'slip-right',
    // 'roll-left',
    // 'roll-right',
    // 'block-up-left',
    // 'block-up-right',
    // 'block-down-left',
    // 'block-down-right',
    // 'block-front',
    // 'slip-then-side-jump-plus-stand-change-left',
    // 'slip-then-side-jump-plus-stand-change-right',
    // 'jab',
    // 'cross-up-left',
    // 'cross-up-right',
    // 'cross-down-left',
    // 'cross-down-right',
    // 'hook-left',
    // 'hook-right',
    // 'uppercut-up-left',
    // 'uppercut-up-right',
    // 'uppercut-down-left',
    // 'uppercut-down-right',
    // 'overhand-left',
    // 'overhand-right',
    'standing',
    'warming-up',
    'victory-1',
    'victory-2',
    'defeat-1',
    'defeat-2',
    'provoking',
    'teasing',
    'falling-1',
    'falling-2',
    'getting-up-1',
    'getting-up-2',
  ];
  const loopedAnimationsNames = [
    'fighting-idle',
    'warming-up',
  ];

  const animationsLoadingPromises = animationsNames.map((name) => {
    loadFBX('../../../../assets/animations/' + name + '.fbx').then((animation) => {
      animationActions[0][name] = animationMixers[0].clipAction(animation.animations[0]);
      animationActions[0][name].setLoop(loopedAnimationsNames.includes(name) ? LoopRepeat : LoopOnce);
      animationActions[0][name].clampWhenFinished = true;
      animationActions[1][name] = animationMixers[1].clipAction(animation.animations[0]);
      animationActions[1][name].setLoop(loopedAnimationsNames.includes(name) ? LoopRepeat : LoopOnce);
      animationActions[1][name].clampWhenFinished = true;
    }).catch((error) => {
      console.log(error);
    });
  });

  await Promise.all(animationsLoadingPromises).catch((error) => {
    console.log(error);
  });

  boxers[0] = new Boxer(models[0], animationMixers[0], animationActions[0]);
  boxers[1] = new Boxer(models[1], animationMixers[1], animationActions[1]);

  return boxers;
};

export default setupBoxers;
