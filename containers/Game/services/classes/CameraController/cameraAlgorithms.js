/** @module containers/Game/services/classes/CameraController/cameraAlgorithms */

import { Vector3 } from "three";

/**
  @summary Gets location parameters of specified bone in specified model
  @param model model
  @param boneName bone name
  @returns an object with position, rotationY and quaternion
*/
export const getLocationAttributesOfModelBoneByName = (model, boneName) => {
  // getting bone by its name
  const bone = model.getObjectByName(boneName);

  // calculating and returning an object of position, rotationY and quaternion
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
  // cameraPosition (world) = position (world) + positionOffsetVector (local)
  const cameraPosition = position.clone();
  cameraPosition.add(positionOffsetVector);

  // cameraLookAt (world) = position (world) + lookAtVector (local)
  const cameraLookAt = cameraPosition.clone();
  cameraLookAt.add(lookAtVector);

  return { cameraPosition, cameraLookAt };
};
