/** @module containers/Game/services/setupScripts/setupBoxers */

import { AnimationMixer, LoopOnce, LoopRepeat } from 'three';
import { SkeletonUtils } from 'three-stdlib';

import Boxer from '../classes/Boxer/Boxer';

import { loadFBX } from '../algorithms/assetsLoaders';

import webGLParameters from '../constants/webGLParameters';
import boxerParameters from '../constants/boxerParameters';
import ringParameters from '../constants/ringParameters';
import modelNames from '../constants/modelNames';
import boxerAnimations from '../constants/boxerAnimations';

/**
  @summary Initializes two Boxer instances
  @description Loads models and animations, creates two Boxer instances.
  @param scene Three.js scene where the two boxers will render
  @returns an object of two Boxer instances
*/
const setupBoxers = async (scene) => {
  let leftModel, rightModel;
  let leftAnimationMixer, rightAnimationMixer;
  const leftAnimationActions = {},
    rightAnimationActions = {};

  // promise to load model
  const modelsLoadingPromise = loadFBX('../../../../assets/models/' + modelNames.boxer + '.fbx')
    .then((model) => {
      // setting rendering layer of each model child to normal layer
      model.traverse((obj) => {
        obj.layers.set(webGLParameters.layers.NORMAL);
      });

      // scaling the model
      const scaleCoefficient = boxerParameters.scale * 0.15;
      model.scale.set(scaleCoefficient, scaleCoefficient, scaleCoefficient);

      // clonning the model and configuring the clone for the left boxer
      leftModel = SkeletonUtils.clone(model);
      leftModel.rotation.y = Math.PI / 2.0;
      leftModel.position.set(
        (ringParameters.canvas.width * 1.0) / 16.0,
        0.0,
        (ringParameters.canvas.width * 1.0) / 16.0
      );

      // clonning the model and configuring the clone for the right boxer
      rightModel = SkeletonUtils.clone(model);
      rightModel.rotation.y = -Math.PI / 2.0;
      rightModel.position.set(
        (ringParameters.canvas.width * 15.0) / 16.0,
        0.0,
        (ringParameters.canvas.width * 15.0) / 16.0
      );

      // adding both models to the scene
      scene.add(leftModel, rightModel);

      // creating animation mixers for both models
      leftAnimationMixer = new AnimationMixer(leftModel);
      rightAnimationMixer = new AnimationMixer(rightModel);
    })
    .catch((error) => {
      console.log(error);
    });

  // waiting for the model loading promise
  await modelsLoadingPromise;

  // promises to load all animations
  const animationsLoadingPromises = boxerAnimations.map((boxerAnimation) =>
    loadFBX('../../../../assets/animations/' + boxerAnimation.name + '.fbx')
      .then((animation) => {
        const name = boxerAnimation.name;
        const loopMode = boxerAnimations.looped ? LoopRepeat : LoopOnce;

        // creating, adding and configuring animation action
        // for given animation for the left boxer
        leftAnimationActions[name] = leftAnimationMixer.clipAction(animation.animations[0]);
        leftAnimationActions[name].setLoop(loopMode);
        leftAnimationActions[name].clampWhenFinished = true;

        // creating, adding and configuring animation action
        // for given animation for the right boxer
        rightAnimationActions[name] = rightAnimationMixer.clipAction(animation.animations[0]);
        rightAnimationActions[name].setLoop(loopMode);
        rightAnimationActions[name].clampWhenFinished = true;
      })
      .catch((error) => {
        console.log(error);
      })
  );

  // waiting for all animation loading promises
  await Promise.all(animationsLoadingPromises);

  // a function to calculate idle animation for given boxer
  const calculateIdleAnimations = (boxerAnimations) => {
    const lowerBodyIdleAnimations = [],
      upperBodyIdleAnimations = [];

    // for each boxer animation add it to idle animations
    // if it has flag "idle" setted
    boxerAnimations.forEach((boxerAnimation) => {
      if (boxerAnimation.idle) {
        if (boxerAnimation.type === 'lower' || boxerAnimation.type === 'whole') {
          lowerBodyIdleAnimations.push(boxerAnimation.name);
        }
        if (boxerAnimation.type === 'upper' || boxerAnimation.type === 'whole') {
          upperBodyIdleAnimations.push(boxerAnimation.name);
        }
      }
    });

    const lowerBodyIdleAnimationsLength = lowerBodyIdleAnimations.length;
    const upperBodyIdleAnimationsLength = upperBodyIdleAnimations.length;

    let randomIndex;

    // calculating idle animations for each part of body for the left boxer
    randomIndex = Math.floor(Math.random() * lowerBodyIdleAnimationsLength);
    const leftLowerBodyIdleAnimation = lowerBodyIdleAnimations[randomIndex];
    randomIndex = Math.floor(Math.random() * upperBodyIdleAnimationsLength);
    const leftUpperBodyIdleAnimation = upperBodyIdleAnimations[randomIndex];

    // calculating idle animations for each part of body for the right boxer
    randomIndex = Math.floor(Math.random() * lowerBodyIdleAnimationsLength);
    const rightLowerBodyIdleAnimation = lowerBodyIdleAnimations[randomIndex];
    randomIndex = Math.floor(Math.random() * upperBodyIdleAnimationsLength);
    const rightUpperBodyIdleAnimation = upperBodyIdleAnimations[randomIndex];

    return {
      left: {
        lower: leftLowerBodyIdleAnimation,
        upper: leftUpperBodyIdleAnimation,
      },
      right: {
        lower: rightLowerBodyIdleAnimation,
        upper: rightUpperBodyIdleAnimation,
      },
    };
  };

  // calculating idle animations for each boxer
  const idleAnimations = calculateIdleAnimations(boxerAnimations);

  // creating two objects containing arguments for
  // both Boxer instances constructors
  const leftBoxerConstructorArguments = {
    model: leftModel,
    animationMixer: leftAnimationMixer,
    animationActions: leftAnimationActions,
    idleAnimations: idleAnimations.left,
  };
  const rightBoxerConstructorArguments = {
    model: rightModel,
    animationMixer: rightAnimationMixer,
    animationActions: rightAnimationActions,
    idleAnimations: idleAnimations.right,
  };

  // returning an object of both boxers
  return {
    leftBoxer: new Boxer(leftBoxerConstructorArguments),
    rightBoxer: new Boxer(rightBoxerConstructorArguments),
  };
};

export default setupBoxers;
