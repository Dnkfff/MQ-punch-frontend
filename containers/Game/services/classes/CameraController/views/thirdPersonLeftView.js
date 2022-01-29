/** @module containers/Game/services/classes/CameraController/views/thirdPersonLeftView */

import { Vector3 } from "three";

import {
  getLocationAttributesOfModelChildByName,
  calculateCameraParameters,
} from "../cameraAlgorithms";

import boxerParameters from "../../../constants/boxerParameters";
import { boxerModelBoneNames } from "../../../constants/viewNames";

/**
  @summary View from the left of the third person function
  @description Calculates new camera position and lookAt vectors
  according to the previous ones, camera view and target model position and rotation.
  @param model target boxer model
  @returns new camera parameters
*/
const thirdPersonLeftView = (model) => {
  const { childPosition, parentRotation, childQuaternion } =
    getLocationAttributesOfModelChildByName(
      model,
      boxerModelBoneNames["neck"]
    );

  const positionOffsetVector = new Vector3(
    Math.sin(parentRotation.y - Math.PI / 6.0),
    Math.sin(-Math.PI / 12.0),
    Math.cos(parentRotation.y - Math.PI / 6.0)
  );
  const lookAtVector = positionOffsetVector.clone();

  positionOffsetVector.multiplyScalar(boxerParameters.scale * -20.0);

  return calculateCameraParameters({
    childPosition,
    positionOffsetVector,
    lookAtVector,
  });
};

export default thirdPersonLeftView;
