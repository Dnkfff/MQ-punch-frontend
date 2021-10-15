import * as THREE from 'three';

import { getGeometricAttributesOfModelChildByName, calculateCameraParameters } from '../cameraAlgorithms';

import boxerParameters from '../../../constants/boxerParameters';
import { modelBoneNames } from '../../../constants/viewNames';


const thirdPersonRightView = (model) => {
  const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, modelBoneNames['neck']);

  const positionOffsetVector = new THREE.Vector3(Math.sin(parentRotation.y + Math.PI / 6.0), Math.sin(-Math.PI / 12.0), Math.cos(parentRotation.y + Math.PI / 6.0));
  const lookAtVector = positionOffsetVector.clone();

  positionOffsetVector.multiplyScalar(boxerParameters.scale * -20.0);

  return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
};

export default thirdPersonRightView;
