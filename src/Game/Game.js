import React, { useEffect } from 'react';

import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

import setupWebGL from './services/setupScripts/setupWebGL';
import setupRing from './services/setupScripts/setupRing';
import setupSkybox from './services/setupScripts/setupSkybox';
import setupBoxers from './services/setupScripts/setupBoxers';

import webGLParameters from './services/constants/webGLParameters';
import ringParameters from './services/constants/ringParameters';

import CameraController from './services/classes/CameraController/CameraController';


const Game = () => {
  useEffect(() => {
    let scene, renderer, composer;
    let cameraController;
    let boxers;
    let controls;
    const clock = new THREE.Clock();
    let deltaTime = 0;

    async function init() {
      const container = document.getElementById('container');

      let camera;
      [ scene, camera, renderer, composer ] = setupWebGL({ container, window });

      boxers = await setupBoxers(scene);

      const skybox = await setupSkybox(scene);
      cameraController = new CameraController(camera, skybox);

      controls = new OrbitControls(cameraController.camera, renderer.domElement);
      controls.update();

      setupRing(scene);

      clock.start();

      setTimeout(render, 1);
    }

    function render() {
      requestAnimationFrame(render);

      updateCanvasSize();

      deltaTime = clock.getDelta();
      if (deltaTime > 0) {
        boxers.forEach((boxer) => {
          boxer.animate(deltaTime);
        });
      }

      const cameraLookAtPosition = new THREE.Vector3(ringParameters.canvas.width / 2, -ringParameters.canvas.height / 2, ringParameters.canvas.width / 2);
      cameraController.updateCamera({
        cameraLookAtPosition,
        deltaTime,
        requestedMode: 0,
      });

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
