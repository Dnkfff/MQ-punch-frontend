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
  @description Initializes Three.js scene (on WebGL), boxers, skybox, camera controller,
  ring environment, runs the duel scenario calculation algorithm.
  Then starts duel controller and renders scene objects.
  @returns div tag with controlled by Three.js canvas
*/
const Game = () => {
  useEffect(() => {
    let scene, renderer, composer;
    let cameraController, duelController;
    const clock = new Clock();
    let deltaTime = 0.0;
    let leftBoxer, rightBoxer;

    async function init() {
      const container = document.getElementById("container");

      let camera;
      let timePoint = new Date(); // TODO to be deleted
      ({ scene, camera, renderer, composer } = setupWebGL({
        container,
        window,
      }));
      console.log(new Date() - timePoint); // TODO to be deleted

      timePoint = new Date(); // TODO to be deleted
      ({ leftBoxer, rightBoxer } = await setupBoxers(scene));
      console.log(new Date() - timePoint); // TODO to be deleted

      timePoint = new Date(); // TODO to be deleted
      const skybox = await setupSkybox(scene);
      console.log(new Date() - timePoint); // TODO to be deleted
      cameraController = new CameraController(camera, skybox, leftBoxer.model);
      cameraController.enableAutomaticMode(false); // TODO to be deleted
      cameraController.setView("third-person-center"); // TODO to be deleted

      setupRing(scene);

      const leftBoxerStats = {
        // TODO to be deleted
        strength: 60,
        agility: 60,
        endurance: 60,
        rookie: 0.1,
        winrate: 0.1,
        streaming: 0.1,
        leadingSide: "right",
      };
      const rightBoxerStats = {
        // TODO to be deleted
        strength: 60,
        agility: 60,
        endurance: 60,
        rookie: 0.1,
        winrate: 0.1,
        streaming: 0.1,
        leadingSide: "left",
      };
      if (leftBoxerStats.leadingSide === "left") {
        leftBoxer.switchLeadingSide();
      }
      if (rightBoxerStats.leadingSide === "left") {
        rightBoxer.switchLeadingSide();
      }

      timePoint = new Date(); // TODO to be deleted
      const duelScenario = calculateDuelScenario(
        leftBoxerStats,
        rightBoxerStats
      );
      console.log(new Date() - timePoint); // TODO to be deleted
      duelController = new DuelController({
        duelScenario,
        leftBoxer,
        rightBoxer,
        cameraController,
      });

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

  return <div id="container" />;
};

export default Game;
