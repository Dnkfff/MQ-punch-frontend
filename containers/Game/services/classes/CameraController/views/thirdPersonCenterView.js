/** @module containers/Game/services/classes/CameraController/views/thirdPersonCenterView */

import { Vector3 } from 'three';

import {
  getLocationAttributesOfModelBoneByName,
  calculateCameraParameters,
} from '../cameraAlgorithms';

import boxerParameters from '../../../constants/boxerParameters';
import { boxerModelBoneNames } from '../../../constants/viewNames';

/**
  @summary View from the center of the third person function
  @description Calculates new camera position and lookAt vectors
  according to target position, rotationY and quaternion
  in specific way.
  @param model boxer model
  @returns new camera parameters
*/
const thirdPersonCenterView = (model) => {
  // getting bone position, rotationY and quaternion
  const { position, rotationY, quaternion } = getLocationAttributesOfModelBoneByName(
    model,
    boxerModelBoneNames['neck']
  );

  const positionOffsetVector = new Vector3(
    Math.sin(rotationY),
    Math.sin(-Math.PI / 12.0),
    Math.cos(rotationY)
  );
  const lookAtVector = positionOffsetVector.clone();

  positionOffsetVector.multiplyScalar(boxerParameters.scale * -20.0);

  // calculating and returning new camera parameters
  return calculateCameraParameters({
    position,
    positionOffsetVector,
    lookAtVector,
  });
};

export default thirdPersonCenterView;
