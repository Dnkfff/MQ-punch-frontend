import { SkeletonUtils } from 'three-stdlib';

import { loadModel, loadAnimation } from '../algorithms/assetsLoaders';

import webGLParameters from '../constants/webGLParameters';
import ringParameters from '../constants/ringParameters';

import Boxer from '../classes/Boxer/Boxer';


const setupBoxers = async (scene) => {
  const boxers = [];
  const models = [];
  const animations = [{}, {}];

  const modelsLoadingPromise = loadModel('../../../../assets/models/ybot.fbx').then((model) => {
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
  }).catch((error) => {
    console.log(error);
  });

  const animationsLoadingPromises = [];
  animationsLoadingPromises.push(loadAnimation('../../../../assets/animations/warming-up.fbx').then((animation) => {
    animations[0]['warming-up'] = animation.animations[0];
    animations[1]['warming-up'] = animation.animations[0];
  }).catch((error) => {
    console.log(error);
  }));
  animationsLoadingPromises.push(loadAnimation('../../../../assets/animations/jab-cross.fbx').then((animation) => {
    animations[0]['jab-cross'] = animation.animations[0];
    animations[1]['jab-cross'] = animation.animations[0];
  }).catch((error) => {
    console.log(error);
  }));

  await Promise.all(animationsLoadingPromises).catch((error) => {
    console.log(error);
  });

  boxers[0] = new Boxer(models[0], animations[0]);
  boxers[1] = new Boxer(models[1], animations[1]);

  boxers[1].requestAnimation('warming-up');
  boxers[0].requestAnimation('warming-up');

  return boxers;
};

export default setupBoxers;
