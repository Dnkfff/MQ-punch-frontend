/** @module containers/Game/services/setupScripts/setupRing */

import * as THREE from 'three';

import webGLParameters from '../constants/webGLParameters';
import ringParameters from '../constants/ringParameters';

/**
  @summary Initializes ring canvas
  @param scene THREE.js scene
*/
export const setupCanvas = (scene) => {
  // creating a box geometry
  const geometry = new THREE.BoxGeometry(
    ringParameters.canvas.width,
    ringParameters.canvas.height,
    ringParameters.canvas.width
  );

  // creating a basic material
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(ringParameters.canvas.color),
  });

  // creating a canvas mesh
  const canvas = new THREE.Mesh(geometry, material);

  // setting canvas positing
  canvas.position.set(
    ringParameters.canvas.width / 2.0,
    -ringParameters.canvas.height / 2.0,
    ringParameters.canvas.width / 2.0
  );

  // setting canvas rendering layer to normal layer
  canvas.layers.set(webGLParameters.layers.NORMAL);

  // adding canvas to the scene
  scene.add(canvas);
};

/**
  @summary Initializes ring pillars
  @param scene THREE.js scene
*/
export const setupPillars = (scene) => {
  // creating a cylinder geometry
  const geometry = new THREE.CylinderGeometry(
    ringParameters.pillars.radius,
    ringParameters.pillars.radius,
    ringParameters.canvas.height + ringParameters.ropes.height,
    32
  );

  // creating a basic material
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(ringParameters.pillars.color),
  });

  // for each pillar
  for (let i = 0; i < 4; i++) {
    // creating a pillar
    const pillar = new THREE.Mesh(geometry, material);

    // setting pillar position according to corner
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

    // setting pillar rendering layer to normal layer
    pillar.layers.set(webGLParameters.layers.NORMAL);

    // adding pillar to the scene
    scene.add(pillar);

    // creating a copy of the normal pillar for the bloom layer
    const bloomPillar = pillar.clone();

    // setting bloom pillar rendering layer to bloom layer
    bloomPillar.layers.set(webGLParameters.layers.BLOOM);

    // adding bloom pillar to the scene
    scene.add(bloomPillar);
  }
};

/**
  @summary Initializes ring ropes
  @param scene THREE.js scene
*/
export const setupRopes = (scene) => {
  // creating a cylinder geometry
  const geometry = new THREE.CylinderGeometry(
    ringParameters.ropes.radius,
    ringParameters.ropes.radius,
    ringParameters.canvas.width,
    32
  );

  // creating a basic material
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(ringParameters.ropes.color),
  });

  // calculating rope height step
  const ropesStep = ringParameters.ropes.height / ringParameters.ropes.count;

  // for each rope height level
  for (let i = 0; i < ringParameters.ropes.count + 1; i++) {
    for (let j = 0; j < 4; j++) {
      // creating a rope
      const rope = new THREE.Mesh(geometry, material);

      // setting pillar position and rotation according to side
      switch (j) {
        case 0:
          rope.rotateX(Math.PI / 2.0);
          rope.position.set(0.0, ropesStep * i, ringParameters.canvas.width / 2.0);
          break;
        case 1:
          rope.rotateY(Math.PI / 2.0);
          rope.rotateX(Math.PI / 2.0);
          rope.position.set(
            ringParameters.canvas.width / 2.0,
            ropesStep * i,
            ringParameters.canvas.width
          );
          break;
        case 2:
          rope.rotateX(Math.PI / 2.0);
          rope.position.set(
            ringParameters.canvas.width,
            ropesStep * i,
            ringParameters.canvas.width / 2.0
          );
          break;
        case 3:
          rope.rotateY(Math.PI / 2.0);
          rope.rotateX(Math.PI / 2.0);
          rope.position.set(ringParameters.canvas.width / 2.0, ropesStep * i, 0.0);
          break;
      }

      // setting rope rendering layer to normal layer
      rope.layers.set(webGLParameters.layers.NORMAL);

      // adding rope to the scene
      scene.add(rope);

      // creating a copy of the normal rope for the bloom layer
      const bloomRope = rope.clone();

      // setting bloom rope rendering layer to bloom layer
      bloomRope.layers.set(webGLParameters.layers.BLOOM);

      // adding bloom rope to the scene
      scene.add(bloomRope);
    }
  }
};

/**
  @summary Initializes ring and rest of environment
  @description Initializes ring canvas, pillars and ropes.
  @param scene THREE.js scene where the ring will render
*/
const setupRing = (scene) => {
  setupCanvas(scene);
  setupPillars(scene);
  setupRopes(scene);
};

export default setupRing;
