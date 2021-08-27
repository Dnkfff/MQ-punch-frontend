import cameraViews from './cameraViews';

import ringParameters from '../../constants/ringParameters';


class CameraController {
  constructor(camera, skybox, targetModel) {
    this.camera = camera;

    this.skybox = skybox;

    this.mode = 'automatic';
    this.view = 'first-person';
    this.targetModel = targetModel;
  }

  setMode(mode) {
    this.mode = mode;
    if (this.mode === 'free') {
      this.camera.position.set(ringParameters.canvas.width, ringParameters.canvas.height, ringParameters.canvas.width);
      this.camera.lookAt(ringParameters.canvas.width / 2, 0, ringParameters.canvas.width / 2);
    }
  }

  setView(view) {
    this.view = view;
  }

  setTargetModel(targetModel) {
    this.targetModel = targetModel;
  }

  modesHandler(deltaTime) {
    const { cameraPosition, cameraLookAt } = cameraViews[this.view](this.targetModel);
    this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    this.camera.lookAt(cameraLookAt.x, cameraLookAt.y, cameraLookAt.z);
  }

  update(deltaTime) {
    switch (this.mode) {
      case 'automatic':
        break;
      case 'fixed':
        this.modesHandler(deltaTime);
        break;
      case 'free':
        break;
    }

    this.skybox.position.copy(this.camera.position);
  }
}

export default CameraController;
