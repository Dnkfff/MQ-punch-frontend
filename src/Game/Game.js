import React, { useEffect } from 'react';

import { Clock } from 'three';

import setupWebGL from './services/setupScripts/setupWebGL';
import setupRing from './services/setupScripts/setupRing';
import setupSkybox from './services/setupScripts/setupSkybox';
import setupBoxers from './services/setupScripts/setupBoxers';

import webGLParameters from './services/constants/webGLParameters';

import CameraController from './services/classes/CameraController/CameraController';
import DuelController from './services/classes/DuelController/DuelController';

import calculateDuelScenario from './services/algorithms/calculateDuelScenario/calculateDuelScenario';


const Game = () => {
  useEffect(() => {
    let scene, renderer, composer;
    let cameraController, duelController;
    const clock = new Clock();
    let deltaTime = 0.0;
    let leftBoxer, rightBoxer;

    async function init() {
      const container = document.getElementById('container');

      let camera;
      ({ scene, camera, renderer, composer } = setupWebGL({ container, window }));

      ({ leftBoxer, rightBoxer } = await setupBoxers(scene));

      const skybox = await setupSkybox(scene);
      cameraController = new CameraController(camera, skybox, leftBoxer.model);

      setupRing(scene);

      if (leftBoxerStats.leadingSide === 'left') {
        leftBoxer.switchLeadingSide();
      }
      if (rightBoxerStats.leadingSide === 'left') {
        rightBoxer.switchLeadingSide();
      }

      const duelScenario = calculateDuelScenario(leftBoxerStats, rightBoxerStats);
      duelController = new DuelController({ duelScenario, leftBoxer, rightBoxer, cameraController });

      clock.start();

      duelController.run();

      render();
    }

    function render() {
      requestAnimationFrame(render);

      updateCanvasSize();

      deltaTime = clock.getDelta();
      if (deltaTime > 0.0) {
        duelController.act(deltaTime);
      }

      cameraController.update(deltaTime);

      renderer.clear();

      cameraController.camera.layers.set(webGLParameters.layers.BLOOM);
      composer.render();

      renderer.clearDepth();
      cameraController.camera.layers.set(webGLParameters.layers.NORMAL);
      renderer.render(scene, cameraController.camera);
    }

    function updateCanvasSize() {
      cameraController.camera.aspect = window.innerWidth / window.innerHeight;
      cameraController.camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      composer.setSize(window.innerWidth, window.innerHeight);
      composer.setPixelRatio(window.devicePixelRatio);
    }

    init();
  }, []);

  return <div id='container' />;
};

export default Game;
