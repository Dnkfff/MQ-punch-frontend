/** @module containers/Game/services/classes/CameraController/views/sideLeftView */

import { Vector3 } from "three";

import {
  getLocationAttributesOfModelBoneByName,
  calculateCameraParameters,
} from "../cameraAlgorithms";

import boxerParameters from "../../../constants/boxerParameters";
import { boxerModelBoneNames } from "../../../constants/viewNames";

/**
  @summary View from the left function
  @description Calculates new camera position and lookAt vectors
  according to target position, rotationY and quaternion
  in specific way.
  @param model boxer model
  @returns new camera parameters
*/
const sideLeftView = (model) => {
  // getting bone position, rotationY and quaternion
  const { position, rotationY, quaternion } =
    getLocationAttributesOfModelBoneByName(model, boxerModelBoneNames["spine"]);

  const positionOffset = new Vector3(
    Math.sin(rotationY),
    0.6,
    Math.cos(rotationY)
  );
  positionOffset.multiplyScalar(boxerParameters.scale * 5.0);
  position.add(positionOffset);

  const positionOffsetVector = new Vector3(
    Math.sin(rotationY - Math.PI / 2.0),
    0.0,
    Math.cos(rotationY - Math.PI / 2.0)
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

export default sideLeftView;
