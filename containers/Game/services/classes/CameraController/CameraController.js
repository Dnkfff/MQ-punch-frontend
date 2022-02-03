/** @module containers/Game/services/classes/CameraController/CameraController */

import cameraViews from './cameraViews';

import viewNames from '../../constants/viewNames';

/**
  @summary The CameraController class
  @description Controls camera position, target, views and modes.
  @class
*/
class CameraController {
  /**
    @summary CameraController constructor
    @constructor
    @param camera camera
    @param skybox skybox
    @param target target
  */
  constructor(camera, skybox, target) {
    this.camera = camera;

    this.skybox = skybox;

    this.target = target;
    this.automaticModeEnabled = true;
    this.view = viewNames[0];
  }

  /**
    @summary Sets target
    @param target
  */
  setTarget(target) {
    this.target = target;
  }

  /**
    @summary Sets automaticModeEnabled
    @param enable
  */
  enableAutomaticMode(enable) {
    this.automaticModeEnabled = enable;
  }

  /**
    @summary Sets view
    @param view
  */
  setView(view) {
    this.view = view;
  }

  /**
    @summary Updates camera parameters according to active view
  */
  modesHandler() {
    // getting positions of camera and target from the appropriate view function
    const { cameraPosition, cameraLookAt } = cameraViews[this.view](this.target);

    // setting camera position
    this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

    // setting camera lookAt position
    this.camera.lookAt(cameraLookAt.x, cameraLookAt.y, cameraLookAt.z);
  }

  /**
    @summary Updates camera parameters and skybox position
    @param deltaTime time in seconds passed since the last call
  */
  update(deltaTime) {
    // automatic view mode
    if (this.automaticModeEnabled) {
      // TODO: automatic mode
    }

    // manual view mode
    else {
      this.modesHandler();
    }

    // setting skybox position to camera's one
    this.skybox.position.copy(this.camera.position);
  }
}

export default CameraController;
