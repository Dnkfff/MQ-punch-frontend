import * as THREE from 'three';

import { getGeometricAttributesOfModelChildByName, calculateCameraParameters } from '../cameraAlgorithms';

import { boneNames } from '../../../constants/viewsNames';


const firstPersonView = (model) => {
  const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, boneNames['head']);

  const positionOffsetVector = new THREE.Vector3(Math.sin(parentRotation.y), 0.0, Math.cos(parentRotation.y));
  const lookAtVector = positionOffsetVector.clone();

  lookAtVector.applyQuaternion(childQuaternion);

  positionOffsetVector.multiplyScalar(0.0);

  return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
};

export default firstPersonView;
