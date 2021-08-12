import * as THREE from 'three';
import { EffectComposer, RenderPass, UnrealBloomPass } from 'three-stdlib';

import webGLParameters from '../constants/webGLParameters';
import cameraParameters from '../constants/cameraParameters';


export const setupScene = () => {
  const scene = new THREE.Scene();

  const ambientLight = new THREE.AmbientLight(webGLParameters.lights.ambient.color, webGLParameters.lights.ambient.strength);
  scene.add(ambientLight);

  return scene;
};

export const setupCamera = (window) => {
  const camera = new THREE.PerspectiveCamera(cameraParameters.fieldOfView, window.innerWidth / window.innerHeight, cameraParameters.nearPlaneDistance, cameraParameters.farPlaneDistance);
  return camera;
};

export const setupRenderer = (container, window) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0xffffff, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.85;
  renderer.autoClear = false;

  container.appendChild(renderer.domElement);

  return renderer;
};

export const setupComposer = (window, scene, camera, renderer) => {
  const renderPass = new RenderPass(scene, camera);

  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
  bloomPass.exposure = webGLParameters.bloom.exposure;
  bloomPass.strength = webGLParameters.bloom.strength;
  bloomPass.threshold = webGLParameters.bloom.threshold;
  bloomPass.radius = webGLParameters.bloom.radius;
  bloomPass.renderToScreen = true;

  const composer = new EffectComposer(renderer);
  composer.setSize(window.innerWidth, window.innerHeight);
  composer.setPixelRatio(window.devicePixelRatio);
  composer.addPass(renderPass);
  composer.addPass(bloomPass);

  return composer;
};

const setupWebGL = ({ container, window }) => {
  const scene = setupScene();
  const camera = setupCamera(window);
  const renderer = setupRenderer(container, window);
  const composer = setupComposer(window, scene, camera, renderer);
  return [scene, camera, renderer, composer];
};

export default setupWebGL;
