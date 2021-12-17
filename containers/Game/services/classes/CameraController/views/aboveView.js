/** @module containers/Game/services/classes/CameraController/views/aboveView */

import { Vector3 } from 'three';

import { getGeometricAttributesOfModelChildByName, calculateCameraParameters } from '../cameraAlgorithms';

import boxerParameters from '../../../constants/boxerParameters';
import { boxerModelBoneNames } from '../../../constants/viewNames';


/**
  @summary View from the above function
  @description Calculates new camera position and lookAt vectors
  according to the previous ones, camera view and target model position and rotation.
  @param model target boxer model
  @returns new camera parameters
*/
const aboveView = (model) => {
  const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, boxerModelBoneNames['spine']);

  const childPositionOffset = new Vector3(Math.sin(parentRotation.y), 0.6, Math.cos(parentRotation.y));
  childPositionOffset.multiplyScalar(boxerParameters.scale * 5.0);
  childPosition.add(childPositionOffset);

  const positionOffsetVector = new Vector3(Math.sin(parentRotation.y), -10.0, Math.cos(parentRotation.y));
  const lookAtVector = positionOffsetVector.clone();

  positionOffsetVector.multiplyScalar(boxerParameters.scale * -2.0);

  return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
};

export default aboveView;
