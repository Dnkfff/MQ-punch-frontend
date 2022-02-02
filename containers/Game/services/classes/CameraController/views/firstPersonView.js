/** @module containers/Game/services/classes/CameraController/views/firstPersonView */

import { Vector3 } from "three";

import {
  getLocationAttributesOfModelBoneByName,
  calculateCameraParameters,
} from "../cameraAlgorithms";

import { boxerModelBoneNames } from "../../../constants/viewNames";

/**
  @summary View from the first person function
  @description Calculates new camera position and lookAt vectors
  according to target position, rotationY and quaternion
  in specific way.
  @param model boxer model
  @returns new camera parameters
*/
const firstPersonView = (model) => {
  // getting bone position, rotationY and quaternion
  const { position, rotationY, quaternion } =
    getLocationAttributesOfModelBoneByName(model, boxerModelBoneNames["head"]);

  const positionOffsetVector = new Vector3(
    Math.sin(rotationY),
    0.0,
    Math.cos(rotationY)
  );
  const lookAtVector = positionOffsetVector.clone();

  lookAtVector.applyQuaternion(quaternion);

  positionOffsetVector.multiplyScalar(0.0);

  // calculating and returning new camera parameters
  return calculateCameraParameters({
    position,
    positionOffsetVector,
    lookAtVector,
  });
};

export default firstPersonView;
