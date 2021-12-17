/** @module containers/Game/services/classes/CameraController/views/thirdPersonCenterView */

import { Vector3 } from 'three';

import { getGeometricAttributesOfModelChildByName, calculateCameraParameters } from '../cameraAlgorithms';

import boxerParameters from '../../../constants/boxerParameters';
import { boxerModelBoneNames } from '../../../constants/viewNames';


/**
  @summary View from the center of the third person function
  @description Calculates new camera position and lookAt vectors
  according to the previous ones, camera view and target model position and rotation.
  @param model target boxer model
  @returns new camera parameters
*/
const thirdPersonCenterView = (model) => {
  const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, boxerModelBoneNames['neck']);

  const positionOffsetVector = new Vector3(Math.sin(parentRotation.y), Math.sin(-Math.PI / 12.0), Math.cos(parentRotation.y));
  const lookAtVector = positionOffsetVector.clone();

  positionOffsetVector.multiplyScalar(boxerParameters.scale * -20.0);

  return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
};

export default thirdPersonCenterView;
