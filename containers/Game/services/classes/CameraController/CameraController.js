/** @module containers/Game/services/classes/CameraController/CameraController */

import cameraViews from './cameraViews';

import viewNames from '../../constants/viewNames';


/**
  @summary The CameraController class
  @description Controls Three.js camera position, target and views.
  @class
*/
class CameraController {
  /**
    @summary CameraController constructor
    @constructor
    @param camera Three.js camera
    @param skybox Three.js mesh of the skybox
    @param targetModel
  */
  constructor(camera, skybox, targetModel) {
    this.camera = camera;

    this.skybox = skybox;

    this.targetModel = targetModel;
    this.automaticModeEnabled = true;
    this.view = viewNames[0];
  }

  /**
    @summary Sets targetModel
    @param targetModel
  */
  setTargetModel(targetModel) {
    this.targetModel = targetModel;
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
    const { cameraPosition, cameraLookAt } = cameraViews[this.view](this.targetModel);
    this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    this.camera.lookAt(cameraLookAt.x, cameraLookAt.y, cameraLookAt.z);
  }

  /**
    @summary Updates camera parameters and skybox position
    @param deltaTime time in ms passed since the last call
  */
  update(deltaTime) {
    if (this.automaticModeEnabled) {
      // TODO automatic mode
    } else {
      this.modesHandler();
    }

    this.skybox.position.copy(this.camera.position);
  }
}

export default CameraController;
