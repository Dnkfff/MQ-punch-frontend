/** @module containers/Game/Game */

import React, { useEffect } from "react";

import { Clock } from "three";

import setupWebGL from "./services/setupScripts/setupWebGL";
import setupRing from "./services/setupScripts/setupRing";
import setupSkybox from "./services/setupScripts/setupSkybox";
import setupBoxers from "./services/setupScripts/setupBoxers";

import webGLParameters from "./services/constants/webGLParameters";

import CameraController from "./services/classes/CameraController/CameraController";
import DuelController from "./services/classes/DuelController/DuelController";

import calculateDuelScenario from "./services/algorithms/calculateDuelScenario/calculateDuelScenario";

/**
  @summary The Three.js Game function itself
  @description Initializes Three.js scene, boxers, skybox, camera controller,
  ring environment, runs the duel scenario calculation algorithm.
  Then starts duel controller and renders scene objects.
  @returns div tag with controlled by Three.js canvas
*/
const Game = () => {
  useEffect(() => {
    const clock = new Clock();

    let scene, renderer, composer;

    let leftBoxer, rightBoxer;

    let cameraController;

    let duelController;

    let deltaTime = 0.0;

    // initialization function
    async function init() {
      // getting container element
      const container = document.getElementById("container");

      // creating and configuring WebGL environment
      let camera;
      ({ scene, camera, renderer, composer } = setupWebGL({
        container,
        window,
      }));

      // creating and configuring boxers
      ({ leftBoxer, rightBoxer } = await setupBoxers(scene));

      // creating skybox
      const skybox = await setupSkybox(scene);

      // creating and configuring camera controller
      cameraController = new CameraController(camera, skybox, leftBoxer.model);
      cameraController.enableAutomaticMode(false); // TODO: to be deleted
      cameraController.setView("third-person-center"); // TODO: to be deleted

      // creating ring environment in the scene
      setupRing(scene);

      // TODO: getting boxers stats
      const leftBoxerStats = {
        strength: 60,
        agility: 60,
        endurance: 60,
        rookie: 0.1,
        winrate: 0.1,
        streaming: 0.1,
        leadingSide: "right",
      }; // TODO: to be deleted
      const rightBoxerStats = {
        strength: 60,
        agility: 60,
        endurance: 60,
        rookie: 0.1,
        winrate: 0.1,
        streaming: 0.1,
        leadingSide: "left",
      }; // TODO: to be deleted

      // switching boxers leading sides if they are "left" ("right" is default)
      if (leftBoxerStats.leadingSide === "left") {
        leftBoxer.switchLeadingSide();
      }
      if (rightBoxerStats.leadingSide === "left") {
        rightBoxer.switchLeadingSide();
      }

      // calculating a duel scenario
      const duelScenario = calculateDuelScenario(
        leftBoxerStats,
        rightBoxerStats
      );

      // creating duel controller
      duelController = new DuelController({
        duelScenario,
        leftBoxer,
        rightBoxer,
        cameraController,
      });

      // starting clock
      clock.start();

      // running duelController
      duelController.run();

      // calling render function
      render();
    }

    function render() {
      // requesting render function call after this call ends
      requestAnimationFrame(render);

      // updating WebGL canvas sizes
      updateCanvasSize();

      // getting time difference since the last call
      deltaTime = clock.getDelta();

      // making duelController acting
      duelController.act(deltaTime);

      // updating camera
      cameraController.update(deltaTime);

      // clearing renderer
      renderer.clear();

      // rendering bloom pass
      cameraController.camera.layers.set(webGLParameters.layers.BLOOM);
      composer.render();

      // clearing depth buffer
      renderer.clearDepth();

      // rendering normal pass
      cameraController.camera.layers.set(webGLParameters.layers.NORMAL);
      renderer.render(scene, cameraController.camera);
    }

    function updateCanvasSize() {
      // updating the camera
      cameraController.camera.aspect = window.innerWidth / window.innerHeight;
      cameraController.camera.updateProjectionMatrix();

      // updating the renderer
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      // updating the effect composer
      composer.setSize(window.innerWidth, window.innerHeight);
      composer.setPixelRatio(window.devicePixelRatio);
    }

    // calling the initialization function
    init();
  }, []);

  return <div id="container" />;
};

export default Game;
