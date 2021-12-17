/** @module containers/Game/services/classes/CameraController/views/firstPersonView */

import { Vector3 } from "three";

import {
  getGeometricAttributesOfModelChildByName,
  calculateCameraParameters,
} from "../cameraAlgorithms";

import { boxerModelBoneNames } from "../../../constants/viewNames";

/**
  @summary View from the first person function
  @description Calculates new camera position and lookAt vectors
  according to the previous ones, camera view and target model position and rotation.
  @param model target boxer model
  @returns new camera parameters
*/
const firstPersonView = (model) => {
  const { childPosition, parentRotation, childQuaternion } =
    getGeometricAttributesOfModelChildByName(
      model,
      boxerModelBoneNames["head"]
    );

  const positionOffsetVector = new Vector3(
    Math.sin(parentRotation.y),
    0.0,
    Math.cos(parentRotation.y)
  );
  const lookAtVector = positionOffsetVector.clone();

  lookAtVector.applyQuaternion(childQuaternion);

  positionOffsetVector.multiplyScalar(0.0);

  return calculateCameraParameters({
    childPosition,
    positionOffsetVector,
    lookAtVector,
  });
};

export default firstPersonView;
