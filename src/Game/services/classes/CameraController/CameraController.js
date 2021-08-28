import cameraViews from './cameraViews';


class CameraController {
  constructor(camera, skybox, targetModel) {
    this.camera = camera;

    this.skybox = skybox;

    this.targetModel = targetModel;
    this.automaticModeEnabled = true;
    this.view = 'first-person';
  }

  setTargetModel(targetModel) {
    this.targetModel = targetModel;
  }

  enableAutomaticMode(enable) {
    this.automaticModeEnabled = enable;
  }

  setView(view) {
    this.view = view;
  }

  modesHandler() {
    const { cameraPosition, cameraLookAt } = cameraViews[this.view](this.targetModel);
    this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    this.camera.lookAt(cameraLookAt.x, cameraLookAt.y, cameraLookAt.z);
  }

  update(deltaTime) {
    if (this.automaticModeEnabled) {

    } else {
      this.modesHandler();
    }

    this.skybox.position.copy(this.camera.position);
  }
}

export default CameraController;
