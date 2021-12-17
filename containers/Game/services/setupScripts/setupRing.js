/** @module containers/Game/services/setupScripts/setupRing */

import * as THREE from "three";

import webGLParameters from "../constants/webGLParameters";
import ringParameters from "../constants/ringParameters";

/**
  @summary Initializes ring canvas
  @param scene WebGL scene
*/
export const setupCanvas = (scene) => {
  const geometry = new THREE.BoxGeometry(
    ringParameters.canvas.width,
    ringParameters.canvas.height,
    ringParameters.canvas.width
  );
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(ringParameters.canvas.color),
  });

  const canvas = new THREE.Mesh(geometry, material);

  canvas.position.set(
    ringParameters.canvas.width / 2.0,
    -ringParameters.canvas.height / 2.0,
    ringParameters.canvas.width / 2.0
  );

  canvas.layers.set(0);

  scene.add(canvas);
};

/**
  @summary Initializes ring pillars
  @param scene WebGL scene
*/
export const setupPillars = (scene) => {
  const geometry = new THREE.CylinderGeometry(
    ringParameters.pillars.radius,
    ringParameters.pillars.radius,
    ringParameters.canvas.height + ringParameters.ropes.height,
    32
  );
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(ringParameters.pillars.color),
  });

  for (let i = 0; i < 4; i++) {
    const pillar = new THREE.Mesh(geometry, material);

    switch (i) {
      case 0:
        pillar.position.set(
          0.0,
          (ringParameters.canvas.height - ringParameters.ropes.height) / 2.0,
          ringParameters.canvas.width
        );
        break;
      case 1:
        pillar.position.set(
          ringParameters.canvas.width,
          (ringParameters.canvas.height - ringParameters.ropes.height) / 2.0,
          ringParameters.canvas.width
        );
        break;
      case 2:
        pillar.position.set(
          ringParameters.canvas.width,
          (ringParameters.canvas.height - ringParameters.ropes.height) / 2.0,
          0.0
        );
        break;
      case 3:
        pillar.position.set(
          0.0,
          (ringParameters.canvas.height - ringParameters.ropes.height) / 2.0,
          0.0
        );
        break;
    }

    pillar.layers.set(webGLParameters.layers.NORMAL);
    scene.add(pillar);

    const bloomPillar = pillar.clone();
    bloomPillar.layers.set(webGLParameters.layers.BLOOM);
    scene.add(bloomPillar);
  }
};

/**
  @summary Initializes ring ropes
  @param scene WebGL scene
*/
export const setupRopes = (scene) => {
  const geometry = new THREE.CylinderGeometry(
    ringParameters.ropes.radius,
    ringParameters.ropes.radius,
    ringParameters.canvas.width,
    32
  );
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(ringParameters.ropes.color),
  });

  for (let i = 0; i < ringParameters.ropes.count + 1; i++) {
    for (let j = 0; j < 4; j++) {
      const cylinder = new THREE.Mesh(geometry, material);
      const ropesStep =
        ringParameters.ropes.height / ringParameters.ropes.count;

      switch (j) {
        case 0:
          cylinder.rotateX(Math.PI / 2.0);
          cylinder.position.set(
            0.0,
            ropesStep * i,
            ringParameters.canvas.width / 2.0
          );
          break;
        case 1:
          cylinder.rotateY(Math.PI / 2.0);
          cylinder.rotateX(Math.PI / 2.0);
          cylinder.position.set(
            ringParameters.canvas.width / 2.0,
            ropesStep * i,
            ringParameters.canvas.width
          );
          break;
        case 2:
          cylinder.rotateX(Math.PI / 2.0);
          cylinder.position.set(
            ringParameters.canvas.width,
            ropesStep * i,
            ringParameters.canvas.width / 2.0
          );
          break;
        case 3:
          cylinder.rotateY(Math.PI / 2.0);
          cylinder.rotateX(Math.PI / 2.0);
          cylinder.position.set(
            ringParameters.canvas.width / 2.0,
            ropesStep * i,
            0.0
          );
          break;
      }

      cylinder.layers.set(webGLParameters.layers.NORMAL);
      scene.add(cylinder);

      const bloomCylinder = cylinder.clone();
      bloomCylinder.layers.set(webGLParameters.layers.BLOOM);
      scene.add(bloomCylinder);
    }
  }
};

/**
  @summary Initializes ring and rest of environment
  @description Initializes ring canvas, pillars and ropes.
  @param scene WebGL scene where the ring will render
*/
const setupRing = (scene) => {
  setupCanvas(scene);
  setupPillars(scene);
  setupRopes(scene);
};

export default setupRing;
