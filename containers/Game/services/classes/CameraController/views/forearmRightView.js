/** @module containers/Game/services/classes/CameraController/views/forearmRightView */

import { Vector3 } from "three";

import {
  getLocationAttributesOfModelBoneByName,
  calculateCameraParameters,
} from "../cameraAlgorithms";

import boxerParameters from "../../../constants/boxerParameters";
import { boxerModelBoneNames } from "../../../constants/viewNames";

/**
  @summary View from the right forearm function
  @description Calculates new camera position and lookAt vectors
  according to target position, rotationY and quaternion
  in specific way.
  @param model boxer model
  @returns new camera parameters
*/
const forearmRightView = (model) => {
  const { position, rotationY, quaternion } =
    getLocationAttributesOfModelBoneByName(
      model,
      boxerModelBoneNames["forearm-right"]
    );

  const positionOffsetVector = new Vector3(
    Math.sin(rotationY),
    0.0,
    Math.cos(rotationY)
  );
  const lookAtVector = positionOffsetVector.clone();

  positionOffsetVector.applyQuaternion(quaternion);
  lookAtVector.applyQuaternion(quaternion);

  positionOffsetVector.multiplyScalar(boxerParameters.scale * -5.0);

  return calculateCameraParameters({
    position,
    positionOffsetVector,
    lookAtVector,
  });
};

export default forearmRightView;
