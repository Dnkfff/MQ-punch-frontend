import { getUUID } from '../../../../../../inside-services/get-uuid/get-uuid';

export const playersTableHead = [
  {
    caption: '',
    id: getUUID(),
    style: { width: '10%', padding: '20px 20px' },
    field: 'number',
    className: 'number',
  },
  {
    caption: 'LOGO',
    id: getUUID(),
    style: { width: '20%', padding: '20px 20px' },
    field: 'logo',
    className: 'logo',
  },
  {
    caption: 'NAME',
    id: getUUID(),
    style: { width: '30%', padding: '20px 20px' },
    field: 'name',
    className: 'name',
  },
  {
    caption: 'WINRATE',
    id: getUUID(),
    style: { width: '20%', padding: '20px 20px' },
    field: 'winrate',
    className: 'winrate',
  },
  {
    caption: 'TROFIES',
    id: getUUID(),
    style: { width: '20%', padding: '20px 20px' },
    field: 'trofies',
    className: 'trofies',
  },
  {
    caption: 'PRIZE',
    id: getUUID(),
    style: { width: '20%', padding: '20px 20px' },
    field: 'prize',
    className: 'prize',
  },
];

export const playersTableBody = [
  {
    id: getUUID(),
    number: {
      caption: '1',
    },
    logo: {
      caption: '123',
    },
    name: {
      caption: 'Petro',
    },
    winrate: {
      caption: '100%',
    },
    trofies: {
      caption: '1499',
    },
    prize: {
      caption: '1000$',
    },
  },
  {
    id: getUUID(),
    number: {
      caption: '1',
    },
    logo: {
      caption: '123',
    },
    name: {
      caption: 'Petro',
    },
    winrate: {
      caption: '100%',
    },
    trofies: {
      caption: '1499',
    },
    prize: {
      caption: '1000$',
    },
  },
  {
    id: getUUID(),
    number: {
      caption: '1',
    },
    logo: {
      caption: '123',
    },
    name: {
      caption: 'Petro',
    },
    winrate: {
      caption: '100%',
    },
    trofies: {
      caption: '1499',
    },
    prize: {
      caption: '1000$',
    },
  },
  {
    id: getUUID(),
    number: {
      caption: '1',
    },
    logo: {
      caption: '123',
    },
    name: {
      caption: 'Petro',
    },
    winrate: {
      caption: '100%',
    },
    trofies: {
      caption: '1499',
    },
    prize: {
      caption: '1000$',
    },
  },
];
