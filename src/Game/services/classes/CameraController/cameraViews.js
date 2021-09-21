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

import viewsNames from '../../constants/viewsNames';


const cameraViews = {
  [viewsNames[0]]: firstPersonView,
  [viewsNames[1]]: thirdPersonLeftView,
  [viewsNames[2]]: thirdPersonCenterView,
  [viewsNames[3]]: thirdPersonRightView,
  [viewsNames[4]]: sideLeftView,
  [viewsNames[5]]: sideRightView,
  [viewsNames[6]]: aboveView,
  [viewsNames[7]]: belowView,
  [viewsNames[8]]: forearmLeftView,
  [viewsNames[9]]: forearmRightView,
};

export default cameraViews;
