/** @module containers/Game/services/classes/CameraController/cameraAlgorithms */

import { Vector3 } from "three";

/**
  @summary Gets location parameters of specified bone in specified model
  @param model model
  @param boneName bone name
  @returns an object with position, rotationY and quaternion
*/
export const getLocationAttributesOfModelBoneByName = (model, boneName) => {
  const bone = model.getObjectByName(boneName);

  return {
    position: bone.getWorldPosition(new Vector3()),
    rotationY: model.rotation.y,
    quaternion: bone.quaternion.clone(),
  };
};

/**
  @summary Calculates absolute camera positions and lookAt vectors
  @param params
  @param params.position world position
  @param params.positionOffsetVector local position offset
  @param params.lookAtVector local look at position
  @returns an object with cameraPosition and cameraLookAt
*/
export const calculateCameraParameters = ({
  position,
  positionOffsetVector,
  lookAtVector,
}) => {
  const cameraPosition = position.clone();
  cameraPosition.add(positionOffsetVector);

  const cameraLookAt = cameraPosition.clone();
  cameraLookAt.add(lookAtVector);

  return { cameraPosition, cameraLookAt };
};
