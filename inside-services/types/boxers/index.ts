type User = {
    id: string;
    fullName: string;
}

export enum BoxerWeightClass {
  FLYWEIGHT = 'FLYWEIGHT',
  BANTMAN_WEIGHT = 'BANTMAN_WEIGHT',
  FEATHER_WEIGHT = 'FEATHER_WEIGHT',
  LIGHTWEIGHT = 'LIGHTWEIGHT',
  WELTERWEIGHT = 'WELTERWEIGHT',
  MIDDLEWEIGHT = 'MIDDLEWEIGHT',
  HEAVYWEIGHT = 'HEAVYWEIGHT',
  SUPERHEAVYWEIGHT = 'SUPERHEAVYWEIGHT',
}

export type Stats = {
  strength: number;
  agility: number;
  stamina: number;
};


export enum TrainingTypes {
  STRENGTH = 'STRENGTH',
  AGILITY = 'AGILITY',
  STAMINA = 'STAMINA',
}

export enum TrainingStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  CANCELED = 'CANCELED',
}

export type Training = {
  id: string;
  price: number;
  amountGained: number;
  type: TrainingTypes;
  status: TrainingStatus;
  startedAt: Date;
  boxerId: string;
};


export type NextTrainingInfo = {
  price: number;
  boost: number;
};
export interface AttributeNextTrainingState {
  isMaxed: boolean;
  nextTrainingInfo: NextTrainingInfo | null;
}

export type NextTrainings = Record<TrainingTypes, AttributeNextTrainingState>;

export type TrainingState = {
  nextTrainings: NextTrainings | null;
  isInProgress: boolean;
  activeTraining: Training | null;
  trainingDuration: number;
};


export type Boxer = {
  id: string;
  name: string;
  modelLink: string;
  numberOfFights: number;
  numberOfWins: number;
  points: number;
  logo: string;
  weightClass: BoxerWeightClass;
  ownerId: string;
  statsId: string;
  stats: Stats;
  trainingState?: TrainingState;
};