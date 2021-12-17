/** @module containers/Game/services/constants/ringParameters */

/**
  @brief The object of ring parameters
  @description It contains objects of canvas {width, height, color},
  pillars {radius, color},
  ropes {count, height, radius, color}.
*/
const ringParameters = {
  canvas: {
    width: 100.0,
    height: 20.0,
    color: 0xffffff,
  },
  pillars: {
    radius: 0.5,
    color: 0xffffff,
  },
  ropes: {
    count: 4,
    height: 20.0,
    radius: 0.3,
    color: 0xff0000,
  },
};

export default ringParameters;
