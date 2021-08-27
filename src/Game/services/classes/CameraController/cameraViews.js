import * as THREE from 'three';

import boxerParameters from '../../constants/boxerParameters';


export const getGeometricAttributesOfModelChildByName = (model, name) => {
  const modelChildClone = model.getObjectByName(name).clone();
  return {
    childPosition: modelChildClone.localToWorld(modelChildClone.position),
    parentRotation: model.rotation.clone(),
    childQuaternion: modelChildClone.quaternion,
  };
};

const calculateCameraParameters = ({ childPosition, positionOffsetVector, lookAtVector }) => {
  const cameraPosition = childPosition.clone();
  cameraPosition.add(positionOffsetVector);

  const cameraLookAt = cameraPosition.clone();
  cameraLookAt.add(lookAtVector);

  return { cameraPosition, cameraLookAt };
};

const cameraViews = {
  'first-person': (model) => {
    const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, 'mixamorigHead');

    const positionOffsetVector = new THREE.Vector3(Math.sin(parentRotation.y), 0, Math.cos(parentRotation.y));
    const lookAtVector = positionOffsetVector.clone();

    positionOffsetVector.applyQuaternion(childQuaternion);
    lookAtVector.applyQuaternion(childQuaternion);

    return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
  },
  'third-person-left': (model) => {
    const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, 'mixamorigNeck');

    const positionOffsetVector = new THREE.Vector3(Math.sin(parentRotation.y - Math.PI / 6), Math.sin(-Math.PI / 12), Math.cos(parentRotation.y - Math.PI / 6));
    const lookAtVector = positionOffsetVector.clone();

    positionOffsetVector.multiplyScalar(boxerParameters.scale * -20);

    return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
  },
  'third-person-center': (model) => {
    const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, 'mixamorigNeck');

    const positionOffsetVector = new THREE.Vector3(Math.sin(parentRotation.y), Math.sin(-Math.PI / 12), Math.cos(parentRotation.y));
    const lookAtVector = positionOffsetVector.clone();

    positionOffsetVector.multiplyScalar(boxerParameters.scale * -20);

    return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
  },
  'third-person-right': (model) => {
    const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, 'mixamorigNeck');

    const positionOffsetVector = new THREE.Vector3(Math.sin(parentRotation.y + Math.PI / 6), Math.sin(-Math.PI / 12), Math.cos(parentRotation.y + Math.PI / 6));
    const lookAtVector = positionOffsetVector.clone();

    positionOffsetVector.multiplyScalar(boxerParameters.scale * -20);

    return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
  },
  'side-left': (model) => {
    const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, 'mixamorigSpine');

    const childPositionOffset = new THREE.Vector3(Math.sin(parentRotation.y), 0.6, Math.cos(parentRotation.y));
    childPositionOffset.multiplyScalar(boxerParameters.scale * 5);
    childPosition.add(childPositionOffset);

    const positionOffsetVector = new THREE.Vector3(Math.sin(parentRotation.y - Math.PI / 2), 0, Math.cos(parentRotation.y - Math.PI / 2));
    const lookAtVector = positionOffsetVector.clone();

    positionOffsetVector.multiplyScalar(boxerParameters.scale * -20);

    return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
  },
  'side-right': (model) => {
    const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, 'mixamorigSpine');

    const childPositionOffset = new THREE.Vector3(Math.sin(parentRotation.y), 0.6, Math.cos(parentRotation.y));
    childPositionOffset.multiplyScalar(boxerParameters.scale * 5);
    childPosition.add(childPositionOffset);

    const positionOffsetVector = new THREE.Vector3(Math.sin(parentRotation.y + Math.PI / 2), 0, Math.cos(parentRotation.y + Math.PI / 2));
    const lookAtVector = positionOffsetVector.clone();

    positionOffsetVector.multiplyScalar(boxerParameters.scale * -20);

    return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
  },
  'above': (model) => {
    const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, 'mixamorigNeck');

    const childPositionOffset = new THREE.Vector3(Math.sin(parentRotation.y), 0.6, Math.cos(parentRotation.y));
    childPositionOffset.multiplyScalar(boxerParameters.scale * 5);
    childPosition.add(childPositionOffset);

    const positionOffsetVector = new THREE.Vector3(Math.sin(parentRotation.y), -10, Math.cos(parentRotation.y));
    const lookAtVector = positionOffsetVector.clone();

    positionOffsetVector.multiplyScalar(boxerParameters.scale * -2);

    return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
  },
  'below': (model) => {
    const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, 'mixamorigSpine');

    const childPositionOffset = new THREE.Vector3(Math.sin(parentRotation.y), 0.6, Math.cos(parentRotation.y));
    childPositionOffset.multiplyScalar(boxerParameters.scale * 5);
    childPosition.add(childPositionOffset);

    const positionOffsetVector = new THREE.Vector3(Math.sin(parentRotation.y), 10, Math.cos(parentRotation.y));
    const lookAtVector = positionOffsetVector.clone();

    positionOffsetVector.multiplyScalar(boxerParameters.scale * -2);

    return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
  },
  'forearm-left': (model) => {
    const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, 'mixamorigLeftForeArm');

    const positionOffsetVector = new THREE.Vector3(Math.sin(parentRotation.y), 0, Math.cos(parentRotation.y));
    const lookAtVector = positionOffsetVector.clone();

    positionOffsetVector.applyQuaternion(childQuaternion);
    lookAtVector.applyQuaternion(childQuaternion);

    positionOffsetVector.multiplyScalar(boxerParameters.scale * -5);

    return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
  },
  'forearm-right': (model) => {
    const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, 'mixamorigRightForeArm');

    const positionOffsetVector = new THREE.Vector3(Math.sin(parentRotation.y), 0, Math.cos(parentRotation.y));
    const lookAtVector = positionOffsetVector.clone();

    positionOffsetVector.applyQuaternion(childQuaternion);
    lookAtVector.applyQuaternion(childQuaternion);

    positionOffsetVector.multiplyScalar(boxerParameters.scale * -5);

    return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
  },
};

export default cameraViews;
