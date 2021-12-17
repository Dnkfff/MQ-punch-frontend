/** @module containers/Game/services/constants/webGLParameters */

/**
  @brief The object of WebGL renderer parameters
  @description It contains objects of rendering layers ( layers {NORMAL, BLOOM, MOTION_BLUR}),
  bloom parameters (bloom {exposure, strength, threshold, radius}),
  motionBlur,
  lights {ambient {color, strength}}.
*/
const webGLParameters = {
  layers: {
    NORMAL: 0,
    BLOOM: 1,
    MOTION_BLUR: 2,
  },
  bloom: {
    exposure: 1.5,
    strength: 2.0,
    threshold: 0.0,
    radius: 0.0,
  },
  motionBlur: {
    
  },
  lights: {
    ambient: {
      color: 0xffffff,
      strength: 0.9,
    },
  },
};

export default webGLParameters;
