import { divisionTYPE } from '../divisions/divisions';

export interface BoxerType {
  id: string;
  logo: string;
  name: string;
  numberOfFights: number;
  numberOfWins: number;
  weightClass: string;
}

export interface PlayerType {
  id: string;
  boxerId: string;
  // TO DO BOXER
  boxer: BoxerType;
}

interface EventType {
  countOfPlayers: number;
  division: divisionTYPE;
  entryFee: string;
  id: string;
  name: string;
  prizePool: string;
  startsAt: string;
  eventPlayers: [] | PlayerType[];
}

export interface FutureEventType extends EventType {
  status: 'future';
}

export interface LiveEventType extends EventType {
  status: 'live';
}
