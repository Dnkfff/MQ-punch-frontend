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

export type OpenseaMetadata = {
  id: string;
  tokenAddress: string;
  initialSellPrice: number;
}

export type Stats = {
  strength: number;
  agility: number;
  stamina: number;
};

export type TrainingType = 'STRENGTH' | 'AGILITY' | 'STAMINA';
export interface NextTrainingAttributeInfo {
  boost: number | null;
  isMaxed: boolean;
  trainingDuration: number;
  trainingPrice: number;
}

export type NextTrainingInfo = Record<TrainingType, NextTrainingAttributeInfo>;

export type TrainingInfo = {
  nextTraining: NextTrainingInfo,
  isInProgress: boolean;
  trainingFinishesAt: string | null;
}

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
  openseaMetadata?: OpenseaMetadata;
  trainingInfo?: TrainingInfo;
};