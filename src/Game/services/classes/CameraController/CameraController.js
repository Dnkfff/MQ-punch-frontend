import * as THREE from 'three';

import cameraModes from '../../algorithms/cameraModes';


class CameraController {
  constructor(camera, skybox) {
    this.camera = camera;
    this.camera.position.set(0, 0, 0);
    this.currentPosition = new THREE.Vector3();
    this.currentLookAt = new THREE.Vector3();

    this.modeSwitchingMethod = 'auto';
    this.mode = 0;
    this.modeTime = 0;

    this.skybox = skybox;
  }

  cameraModeHandler(deltaTime, requestedMode) {
    switch (this.modeSwitchingMethod) {
      case 'auto':
        this.modeTime += deltaTime;
        if (this.modeTime >= cameraModes[this.mode].duration) {
          this.mode = (this.mode + 1) % cameraModes.length;
          this.modeTime = 0;
        }
        return cameraModes[this.mode].equation(this.modeTime);
      case 'random':
        this.modeTime += deltaTime;
        if (this.modeTime >= cameraModes[this.mode].duration) {
          const previousMode = this.mode;
          this.mode = Math.floor(Math.random() * cameraModes.length);
          if (previousMode !== this.mode) {
            this.modeTime = 0;
          }
        }
        return cameraModes[this.mode].equation(this.modeTime);
      case 'manual':
        this.modeTime += deltaTime;
        if (requestedMode !== this.mode) {
          this.mode = requestedMode % cameraModes.length;
          this.modeTime = 0;
        }
        return cameraModes[this.mode].equation(this.modeTime);
      case 'free':
        return cameraModes[this.mode].equation(this.modeTime);
    }
  }

  calculateNewCameraParameters(cameraLookAtPosition, deltaTime, requestedMode) {
    const relativeCameraPosition = this.cameraModeHandler(deltaTime, requestedMode);
    const idealOffset = new THREE.Vector3(relativeCameraPosition.x, relativeCameraPosition.y, relativeCameraPosition.z);
    idealOffset.add(cameraLookAtPosition);
    const idealLookAt = new THREE.Vector3(0, 0, 0);
    idealLookAt.add(cameraLookAtPosition);
    return [idealOffset, idealLookAt];
  }

  updateCamera({ cameraLookAtPosition, deltaTime, requestedMode }) {
    const [idealOffset, idealLookAt] = this.calculateNewCameraParameters(cameraLookAtPosition, deltaTime, requestedMode);
    this.currentPosition.copy(idealOffset);
    this.currentLookAt.copy(idealLookAt);

    this.camera.position.copy(this.currentPosition);
    this.camera.lookAt(this.currentLookAt);

    this.updateSkybox();
  }

  updateSkybox() {
    this.skybox.position.copy(this.camera.position);
  }
}

export default CameraController;
