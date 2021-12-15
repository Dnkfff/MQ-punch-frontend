import firstPersonView from './views/firstPersonView';
import thirdPersonLeftView from './views/thirdPersonLeftView';
import thirdPersonCenterView from './views/thirdPersonCenterView';
import thirdPersonRightView from './views/thirdPersonRightView';
import sideLeftView from './views/sideLeftView';
import sideRightView from './views/sideRightView';
import aboveView from './views/aboveView';
import belowView from './views/belowView';
import forearmLeftView from './views/forearmLeftView';
import forearmRightView from './views/forearmRightView';

import viewNames from '../../constants/viewNames';


const cameraViews = {
  [viewNames[0]]: firstPersonView,
  [viewNames[1]]: thirdPersonLeftView,
  [viewNames[2]]: thirdPersonCenterView,
  [viewNames[3]]: thirdPersonRightView,
  [viewNames[4]]: sideLeftView,
  [viewNames[5]]: sideRightView,
  [viewNames[6]]: aboveView,
  [viewNames[7]]: belowView,
  [viewNames[8]]: forearmLeftView,
  [viewNames[9]]: forearmRightView,
};

export default cameraViews;
