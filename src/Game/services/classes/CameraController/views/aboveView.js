import * as THREE from 'three';

import { getGeometricAttributesOfModelChildByName, calculateCameraParameters } from '../cameraAlgorithms';

import boxerParameters from '../../../constants/boxerParameters';
import { boneNames } from '../../../constants/viewsNames';


const aboveView = (model) => {
  const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, boneNames['spine']);

  const childPositionOffset = new THREE.Vector3(Math.sin(parentRotation.y), 0.6, Math.cos(parentRotation.y));
  childPositionOffset.multiplyScalar(boxerParameters.scale * 5);
  childPosition.add(childPositionOffset);

  const positionOffsetVector = new THREE.Vector3(Math.sin(parentRotation.y), -10, Math.cos(parentRotation.y));
  const lookAtVector = positionOffsetVector.clone();

  positionOffsetVector.multiplyScalar(boxerParameters.scale * -2);

  return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
};

export default aboveView;
