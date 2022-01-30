/** @module containers/Game/services/constants/boxerParameters */

/**
  @brief The object of boxer constants
  @description It contains
  scale (scale of boxer),
  animationTransitionDuration (time for blending two consistent animations),
  stepSize (length of average step of boxer),
  idealDistance (ideal distance between two boxers),
  idealDistanceDeviation (maximal deviation of idealDistance).
*/
const boxerParameters = {
  scale: 1.0,
  animationTransitionDuration: 0.1,
  stepSize: 7.0,
  idealDistance: 18.0,
  idealDistanceDeviation: 0.2,
};

export default boxerParameters;
