/** @module containers/Game/services/setupScripts/setupBoxers */

import { AnimationMixer, LoopOnce, LoopRepeat } from "three";
import { SkeletonUtils } from "three-stdlib";

import Boxer from "../classes/Boxer/Boxer";

import { loadFBX } from "../algorithms/assetsLoaders";

import webGLParameters from "../constants/webGLParameters";
import boxerParameters from "../constants/boxerParameters";
import ringParameters from "../constants/ringParameters";
import modelNames from "../constants/modelNames";
import boxerAnimations from "../constants/boxerAnimations";

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

  const modelsLoadingPromise = loadFBX(
    "../../../../assets/models/" + modelNames.boxer + ".fbx"
  )
    .then((model) => {
      model.traverse((obj) => {
        obj.layers.set(webGLParameters.layers.NORMAL);
      });

      const scaleCoefficient = boxerParameters.scale * 0.15;
      model.scale.set(scaleCoefficient, scaleCoefficient, scaleCoefficient);

      leftModel = SkeletonUtils.clone(model);
      leftModel.rotation.y = Math.PI / 2.0;
      leftModel.position.set(
        (ringParameters.canvas.width * 1.0) / 16.0,
        0.0,
        (ringParameters.canvas.width * 1.0) / 16.0
      );

      rightModel = SkeletonUtils.clone(model);
      rightModel.rotation.y = -Math.PI / 2.0;
      rightModel.position.set(
        (ringParameters.canvas.width * 15.0) / 16.0,
        0.0,
        (ringParameters.canvas.width * 15.0) / 16.0
      );

      scene.add(leftModel, rightModel);

      leftAnimationMixer = new AnimationMixer(leftModel);
      rightAnimationMixer = new AnimationMixer(rightModel);
    })
    .catch((error) => {
      console.log(error);
    });

  await modelsLoadingPromise;

  const animationsLoadingPromises = boxerAnimations.map((boxerAnimation) =>
    loadFBX("../../../../assets/animations/" + boxerAnimation.name + ".fbx")
      .then((animation) => {
        const name = boxerAnimation.name;
        const loopMode = boxerAnimations.looped ? LoopRepeat : LoopOnce;

        leftAnimationActions[name] = leftAnimationMixer.clipAction(
          animation.animations[0]
        );
        leftAnimationActions[name].setLoop(loopMode);
        leftAnimationActions[name].clampWhenFinished = true;
        rightAnimationActions[name] = rightAnimationMixer.clipAction(
          animation.animations[0]
        );
        rightAnimationActions[name].setLoop(loopMode);
        rightAnimationActions[name].clampWhenFinished = true;
      })
      .catch((error) => {
        console.log(error);
      })
  );

  await Promise.all(animationsLoadingPromises);

  const calculateIdleAnimations = (boxerAnimations) => {
    const lowerBodyIdleAnimations = [],
      upperBodyIdleAnimations = [];

    boxerAnimations.map((boxerAnimation) => {
      if (boxerAnimation.idle) {
        if (
          boxerAnimation.type === "lower" ||
          boxerAnimation.type === "whole"
        ) {
          lowerBodyIdleAnimations.push(boxerAnimation.name);
        }
        if (
          boxerAnimation.type === "upper" ||
          boxerAnimation.type === "whole"
        ) {
          upperBodyIdleAnimations.push(boxerAnimation.name);
        }
      }
    });

    const lowerBodyIdleAnimationsLength = lowerBodyIdleAnimations.length;
    const upperBodyIdleAnimationsLength = upperBodyIdleAnimations.length;
    let randomIndex;
    randomIndex = Math.floor(Math.random() * lowerBodyIdleAnimationsLength);
    const leftLowerBodyIdleAnimation = lowerBodyIdleAnimations[randomIndex];
    randomIndex = Math.floor(Math.random() * upperBodyIdleAnimationsLength);
    const leftUpperBodyIdleAnimation = upperBodyIdleAnimations[randomIndex];
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
  const idleAnimations = calculateIdleAnimations(boxerAnimations);

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

  return {
    leftBoxer: new Boxer(leftBoxerConstructorArguments),
    rightBoxer: new Boxer(rightBoxerConstructorArguments),
  };
};

export default setupBoxers;
