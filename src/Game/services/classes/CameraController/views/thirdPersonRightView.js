import * as THREE from 'three';

import { getGeometricAttributesOfModelChildByName, calculateCameraParameters } from '../cameraAlgorithms';

import boxerParameters from '../../../constants/boxerParameters';
import { boneNames } from '../../../constants/viewsNames';


const thirdPersonRightView = (model) => {
  const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, boneNames['neck']);

  const positionOffsetVector = new THREE.Vector3(Math.sin(parentRotation.y + Math.PI / 6), Math.sin(-Math.PI / 12), Math.cos(parentRotation.y + Math.PI / 6));
  const lookAtVector = positionOffsetVector.clone();

  positionOffsetVector.multiplyScalar(boxerParameters.scale * -20);

  return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
};

export default thirdPersonRightView;
