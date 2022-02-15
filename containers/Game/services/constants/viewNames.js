/** @module containers/Game/services/constants/viewNames */

/**
  @brief The object of camera view names
*/
const viewNames = [
  'first-person',
  'third-person-left',
  'third-person-center',
  'third-person-right',
  'side-left',
  'side-right',
  'above',
  'below',
  'forearm-left',
  'forearm-right',
];

/**
  @brief The object of aliases of boxers models bones names
*/
export const boxerModelBoneNames = {
  head: 'mixamorigHead',
  neck: 'mixamorigNeck',
  spine: 'mixamorigSpine',
  'forearm-left': 'mixamorigLeftForeArm',
  'forearm-right': 'mixamorigRightForeArm',
};

export default viewNames;
