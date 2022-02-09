/** @module containers/Game/services/setupScripts/setupRing */

import * as THREE from 'three';

import webGLParameters from '../constants/webGLParameters';
import ringParameters from '../constants/ringParameters';

/**
  @summary Initializes ring canvas
  @param scene THREE.js scene
*/
export const setupCanvas = (scene) => {
  // calculating sizes
  const canvasWidth = ringParameters.scale * ringParameters.canvas.width;
  const canvasHeight = ringParameters.scale * ringParameters.canvas.height;

  // creating a box geometry
  const geometry = new THREE.BoxGeometry(canvasWidth, canvasHeight, canvasWidth);

  // creating a basic material
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(ringParameters.canvas.color),
  });

  // creating a canvas mesh
  const canvas = new THREE.Mesh(geometry, material);

  // setting canvas positing
  canvas.position.set(canvasWidth / 2.0, -canvasHeight / 2.0, canvasWidth / 2.0);

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
  // calculating sizes
  const canvasWidth = ringParameters.scale * ringParameters.canvas.width;
  const canvasHeight = ringParameters.scale * ringParameters.canvas.height;
  const pillarsRadius = ringParameters.scale * ringParameters.pillars.radius;
  const ropesHeight = ringParameters.scale * ringParameters.ropes.height;

  // creating a cylinder geometry
  const geometry = new THREE.CylinderGeometry(
    pillarsRadius,
    pillarsRadius,
    canvasHeight + ropesHeight,
    32
  );

  // creating a basic material
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(ringParameters.pillars.color),
  });

  // for each pillar
  for (let i = 0; i < 4; ++i) {
    // creating a pillar
    const pillar = new THREE.Mesh(geometry, material);

    // setting pillar position according to corner
    switch (i) {
      case 0:
        pillar.position.set(0.0, (canvasHeight - ropesHeight) / 2.0, canvasWidth);
        break;
      case 1:
        pillar.position.set(canvasWidth, (canvasHeight - ropesHeight) / 2.0, canvasWidth);
        break;
      case 2:
        pillar.position.set(canvasWidth, (canvasHeight - ropesHeight) / 2.0, 0.0);
        break;
      case 3:
        pillar.position.set(0.0, (canvasHeight - ropesHeight) / 2.0, 0.0);
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
  // calculating sizes
  const canvasWidth = ringParameters.scale * ringParameters.canvas.width;
  const ropesRadius = ringParameters.scale * ringParameters.ropes.radius;
  const ropesHeight = ringParameters.scale * ringParameters.ropes.height;

  // creating a cylinder geometry
  const geometry = new THREE.CylinderGeometry(ropesRadius, ropesRadius, canvasWidth, 32);

  // creating a basic material
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(ringParameters.ropes.color),
  });

  // calculating rope height step
  const ropesStep = ropesHeight / ringParameters.ropes.count;

  // for each rope height level
  for (let i = 0; i < ringParameters.ropes.count + 1; ++i) {
    for (let j = 0; j < 4; j++) {
      // creating a rope
      const rope = new THREE.Mesh(geometry, material);

      // setting pillar position and rotation according to side
      switch (j) {
        case 0:
          rope.rotateX(Math.PI / 2.0);
          rope.position.set(0.0, ropesStep * i, canvasWidth / 2.0);
          break;
        case 1:
          rope.rotateY(Math.PI / 2.0);
          rope.rotateX(Math.PI / 2.0);
          rope.position.set(canvasWidth / 2.0, ropesStep * i, canvasWidth);
          break;
        case 2:
          rope.rotateX(Math.PI / 2.0);
          rope.position.set(canvasWidth, ropesStep * i, canvasWidth / 2.0);
          break;
        case 3:
          rope.rotateY(Math.PI / 2.0);
          rope.rotateX(Math.PI / 2.0);
          rope.position.set(canvasWidth / 2.0, ropesStep * i, 0.0);
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
