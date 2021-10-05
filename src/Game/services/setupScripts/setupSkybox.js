import * as THREE from 'three';

import { loadTexture } from '../algorithms/assetsLoaders';

import webGLParameters from '../constants/webGLParameters';
import cameraParameters from '../constants/cameraParameters';


const setupSkybox = async (scene) => {
  let texture;

  const texturePromise = loadTexture('../../../../assets/textures/skybox/skybox.jpg').then((jpeg) => {
    texture = jpeg;
  }).catch((error) => {
    console.log(error);
  });

  await texturePromise.catch((error) => {
    console.log(error);
  });

  const material = new THREE.MeshBasicMaterial({ map: texture });
  material.side = THREE.BackSide;

  let geometry = new THREE.SphereGeometry(cameraParameters.farPlaneDistance, 32, 32);

  let skybox = new THREE.Mesh(geometry, material);
  skybox.rotateX(Math.PI);
  skybox.rotateZ(Math.PI / 2.0);
  skybox.layers.set(webGLParameters.layers.BLOOM);

  scene.add(skybox);

  return skybox;
};

export default setupSkybox;
