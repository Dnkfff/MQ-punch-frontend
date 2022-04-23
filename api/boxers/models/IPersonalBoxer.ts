export interface IStats {
  agility: string | number;
  strength: string | number;
  stamina: string | number;
}

export interface IBoxerRating {
  division: string;
  rating: string | number;
}

export interface IOwner {
  id: string;
  nickname: string;
}

export interface ITrainingState {
  isInProgress: boolean;
  activeTraining: null;
  nextTrainings: {
    AGILITY: {
      isMaxed: boolean;
      nextTrainingInfo: {
        price: number;
        boost: number;
      };
    };
    STAMINA: {
      isMaxed: boolean;
      nextTrainingInfo: {
        price: number;
        boost: number;
      };
    };
    STRENGTH: {
      isMaxed: boolean;
      nextTrainingInfo: {
        price: number;
        boost: number;
      };
    };
  };
  trainingDuration: number;
}

export interface IPersonalBoxer {
  boxerRating: IBoxerRating[];
  id: string;
  logo: string;
  mainStat: string;
  modelLink: string;
  name: string;
  numberOfFights: number;
  numberOfWins: number;
  owner: IOwner;
  ownerId: string;
  stats: IStats;
  statsId: string;
  weightClass: string;
  trainingState: ITrainingState;
}
