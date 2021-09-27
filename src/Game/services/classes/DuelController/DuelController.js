import { calculateBarycenterOfBoxers } from './duelAlgorithms';


class DuelController {
    constructor(leftBoxer, rightBoxer, duelScenario) {
      this.leftBoxer = leftBoxer;
      this.rightBoxer = rightBoxer;
      this.leftBoxersMoves = duelScenario.leftBoxersMoves;
      this.rightBoxersMoves = duelScenario.rightBoxersMoves;
      this.currentTime = 0;
    }

    act(deltaTime) {
      this.currentTime += deltaTime;

      if (this.leftBoxersMoves[0]?.startTime <= this.currentTime) {
        const move = this.leftBoxersMoves.shift().move;
        this.leftBoxer.requestAnimation(move);
      }

      if (this.rightBoxersMoves[0]?.startTime <= this.currentTime) {
        const move = this.rightBoxersMoves.shift().move;
        this.rightBoxer.requestAnimation(move);
      }
    }
}

export default DuelController;
