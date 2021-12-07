import { divisionTYPE } from '../divisions/divisions';

interface EventType {
  countOfPlayers: number,
  division: divisionTYPE,
  entryFee: string,
  id: string,
  name: string,
  prizePool: string,
  eventPlayers: [] | any[] 
};

export interface FutureEventType extends EventType {
  status: 'future',
};

export interface LiveEventType extends EventType {
  status: 'live'
};