/** @module containers/Game/services/constants/boxerParameters */

/**
  @brief The object of boxer constants
  @description It contains
  scale (boxer model scale),
  animationTransitionDuration (time for blending two consistent animations),
  stepSize (length of average boxer model step),
  idealDistance (ideal distance between two boxer models),
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
