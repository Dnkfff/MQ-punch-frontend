/** @module containers/Game/services/setupScripts/setupSkybox */

import * as THREE from "three";

import { loadTexture } from "../algorithms/assetsLoaders";

import webGLParameters from "../constants/webGLParameters";
import cameraParameters from "../constants/cameraParameters";

/**
  @summary Loads skybox texture and adds it to scene
  @param scene THREE.js scene
  @returns a THREE.js mesh instance of skybox
*/
const setupSkybox = async (scene) => {
  let texture;

  // loading skybox texture
  const texturePromise = loadTexture(
    "../../../../assets/textures/skybox/skybox.jpg"
  )
    .then((jpeg) => {
      texture = jpeg;
    })
    .catch((error) => {
      console.log(error);
    });

  await texturePromise.catch((error) => {
    console.log(error);
  });

  // creating a sphere geometry
  let geometry = new THREE.SphereGeometry(
    cameraParameters.farPlaneDistance,
    32,
    32
  );

  // creating a basic material
  const material = new THREE.MeshBasicMaterial({ map: texture });
  material.side = THREE.BackSide;

  // creating a skybox mesh
  let skybox = new THREE.Mesh(geometry, material);
  skybox.rotateX(Math.PI);
  skybox.rotateZ(Math.PI / 2.0);

  // setting skybox rendering layer to bloom layer
  skybox.layers.set(webGLParameters.layers.BLOOM);

  // adding skybox to the scene
  scene.add(skybox);

  return skybox;
};

export default setupSkybox;
