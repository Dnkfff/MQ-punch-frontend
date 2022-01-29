/** @module containers/Game/services/classes/CameraController/cameraAlgorithms */

import { Vector3 } from "three";

/**
  @summary Gets location parameters of specified bone in specified model
  @param model model
  @param name model child (bone) name
  @returns an object with childPosition, parentRotation and childQuaternion
*/
export const getLocationAttributesOfModelChildByName = (model, name) => {
  const modelChild = model.getObjectByName(name);

  return {
    childPosition: modelChild.getWorldPosition(new Vector3()),
    parentRotation: model.rotation.clone(),
    childQuaternion: modelChild.quaternion.clone(),
  };
};

/**
  @summary Calculates absolute camera positions and lookAt vectors
  @param params
  @param params.childPosition absolute model bone position
  @param params.positionOffsetVector relative position vector
  @param params.lookAtVector relative lookAt vector
  @returns an object with cameraPosition and cameraLookAt
*/
export const calculateCameraParameters = ({
  childPosition,
  positionOffsetVector,
  lookAtVector,
}) => {
  const cameraPosition = childPosition.clone();
  cameraPosition.add(positionOffsetVector);

  const cameraLookAt = cameraPosition.clone();
  cameraLookAt.add(lookAtVector);

  return { cameraPosition, cameraLookAt };
};
