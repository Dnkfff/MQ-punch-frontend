export const getGeometricAttributesOfModelChildByName = (model, name) => {
  const modelChildClone = model.getObjectByName(name).clone();
  return {
    childPosition: modelChildClone.localToWorld(modelChildClone.position),
    parentRotation: model.rotation.clone(),
    childQuaternion: modelChildClone.quaternion,
  };
};

export const calculateCameraParameters = ({ childPosition, positionOffsetVector, lookAtVector }) => {
  const cameraPosition = childPosition.clone();
  cameraPosition.add(positionOffsetVector);

  const cameraLookAt = cameraPosition.clone();
  cameraLookAt.add(lookAtVector);

  return { cameraPosition, cameraLookAt };
};
