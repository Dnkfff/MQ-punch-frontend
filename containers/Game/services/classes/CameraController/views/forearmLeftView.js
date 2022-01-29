/** @module containers/Game/services/classes/CameraController/views/forearmLeftView */

import { Vector3 } from "three";

import {
  getLocationAttributesOfModelChildByName,
  calculateCameraParameters,
} from "../cameraAlgorithms";

import boxerParameters from "../../../constants/boxerParameters";
import { boxerModelBoneNames } from "../../../constants/viewNames";

/**
  @summary View from the left forearm function
  @description Calculates new camera position and lookAt vectors
  according to the previous ones, camera view and target model position and rotation.
  @param model target boxer model
  @returns new camera parameters
*/
const forearmLeftView = (model) => {
  const { childPosition, parentRotation, childQuaternion } =
    getLocationAttributesOfModelChildByName(
      model,
      boxerModelBoneNames["forearm-left"]
    );

  const positionOffsetVector = new Vector3(
    Math.sin(parentRotation.y),
    0.0,
    Math.cos(parentRotation.y)
  );
  const lookAtVector = positionOffsetVector.clone();

  positionOffsetVector.applyQuaternion(childQuaternion);
  lookAtVector.applyQuaternion(childQuaternion);

  positionOffsetVector.multiplyScalar(boxerParameters.scale * -5.0);

  return calculateCameraParameters({
    childPosition,
    positionOffsetVector,
    lookAtVector,
  });
};

export default forearmLeftView;
