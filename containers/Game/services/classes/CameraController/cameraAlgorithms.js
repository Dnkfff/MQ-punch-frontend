/** @module containers/Game/services/classes/CameraController/cameraAlgorithms */

/**
  @summary Gets geometric parameters of specified bone in specified model
  @param model model
  @param name model bone name
  @returns an object with childPosition, parentRotation and childQuaternion
*/
export const getGeometricAttributesOfModelChildByName = (model, name) => {
  const modelChildClone = model.getObjectByName(name).clone();
  return {
    childPosition: modelChildClone.localToWorld(modelChildClone.position),
    parentRotation: model.rotation.clone(),
    childQuaternion: modelChildClone.quaternion,
  };
};

/**
  @summary Calculates absolute camera positions and lookAt vectors
  @param params
  @param params.childPosition absolute model bone position
  @param params.positionOffsetVector relative position vector
  @param params.lookAtVector relative lookAt vector
  @returns an object with cameraPosition and cameraLookAt Three.js vectors
*/
export const calculateCameraParameters = ({ childPosition, positionOffsetVector, lookAtVector }) => {
  const cameraPosition = childPosition.clone();
  cameraPosition.add(positionOffsetVector);

  const cameraLookAt = cameraPosition.clone();
  cameraLookAt.add(lookAtVector);

  return { cameraPosition, cameraLookAt };
};
