const calculateBoxersBarycenter = (leftBoxer, rightBoxer) => {
  return {
    x: (leftBoxer.model.position.x + rightBoxer.model.position.x) / 2,
    y: (leftBoxer.model.position.y + rightBoxer.model.position.y) / 2,
    z: (leftBoxer.model.position.z + rightBoxer.model.position.z) / 2,
  };
};

export default calculateBoxersBarycenter;
