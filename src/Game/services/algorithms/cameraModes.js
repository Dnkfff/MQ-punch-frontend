import ringParameters from '../constants/ringParameters';


const cameraModes = [
  {
    equation: function (time) {
      const angle = this.angleVelocity * time;
      return {
        x: 100 * Math.sin(angle),
        y: 100,
        z: 100 * Math.cos(angle),
      };
    },
    duration: 20,
    angleVelocity: 0.1,
  },
  {
    equation: function () {
      return {
        x: 0,
        y: 150,
        z: 0,
      };
    },
    duration: 20,
    angleVelocity: 0,
  },
];

export default cameraModes;
