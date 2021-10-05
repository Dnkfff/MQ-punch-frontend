export const calculateBarycenterOfBoxers = (leftBoxer, rightBoxer) => {
  return {
    x: (leftBoxer.model.position.x + rightBoxer.model.position.x) / 2.0,
    y: (leftBoxer.model.position.y + rightBoxer.model.position.y) / 2.0,
    z: (leftBoxer.model.position.z + rightBoxer.model.position.z) / 2.0,
  };
};
