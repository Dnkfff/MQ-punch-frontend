/** @module containers/Game/services/classes/CameraController/views/forearmLeftView */

import { Vector3 } from 'three';

import {
  getLocationAttributesOfModelBoneByName,
  calculateCameraParameters,
} from '../cameraAlgorithms';

import boxerParameters from '../../../constants/boxerParameters';
import { boxerModelBoneNames } from '../../../constants/viewNames';

/**
  @summary View from the left forearm function
  @description Calculates new camera position and lookAt vectors
  according to target position, rotationY and quaternion
  in specific way.
  @param model boxer model
  @returns new camera parameters
*/
const forearmLeftView = (model) => {
  // getting bone position, rotationY and quaternion
  const { position, rotationY, quaternion } = getLocationAttributesOfModelBoneByName(
    model,
    boxerModelBoneNames['forearm-left']
  );

  const positionOffsetVector = new Vector3(Math.sin(rotationY), 0.0, Math.cos(rotationY));
  const lookAtVector = positionOffsetVector.clone();

  positionOffsetVector.applyQuaternion(quaternion);
  lookAtVector.applyQuaternion(quaternion);

  positionOffsetVector.multiplyScalar(boxerParameters.scale * -5.0);

  // calculating and returning new camera parameters
  return calculateCameraParameters({
    position,
    positionOffsetVector,
    lookAtVector,
  });
};

export default forearmLeftView;
