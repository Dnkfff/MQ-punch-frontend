import { getUUID } from '../../../../../../inside-services/get-uuid/get-uuid';

export const playersTableHead = [
  {
    caption: 'PLACEMENT',
    id: getUUID(),
    style: { width: '15%', padding: '20px 20px' },
    field: 'number',
    className: 'number',
  },
  {
    caption: 'NAME',
    id: getUUID(),
    style: { width: '40%', padding: '20px 20px' },
    field: 'name',
    className: 'name',
  },
  {
    caption: 'WINRATE',
    id: getUUID(),
    style: { width: '20%', padding: '20px 20px' },
    field: 'winrate',
    className: 'winrate',
    icon: <i class='fad fa-angle-double-up' />,
  },
  {
    caption: 'TROPHIES',
    id: getUUID(),
    style: { width: '20%', padding: '20px 20px' },
    field: 'trophies',
    className: 'trophies',
    icon: <i class='fad fa-trophy-alt' />,
  },
  {
    caption: 'PRIZE',
    id: getUUID(),
    style: { width: '20%', padding: '20px 20px' },
    field: 'prize',
    className: 'prize',
    icon: <i class='fad fa-usd-circle' />,
  },
];

export const playersTableBody = [
  {
    id: getUUID(),
    number: {
      caption: '1',
    },
    name: {
      caption: 'Дамочка №3547 Дамочка №3547',
    },
    winrate: {
      caption: '100%',
    },
    trophies: {
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
    name: {
      caption: 'Дамочка №3547',
    },
    winrate: {
      caption: '100%',
    },
    trophies: {
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
    name: {
      caption: 'Дамочка №3547',
    },
    winrate: {
      caption: '100%',
    },
    trophies: {
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
    name: {
      caption: 'Дамочка №3547',
    },
    winrate: {
      caption: '100%',
    },
    trophies: {
      caption: '1499',
    },
    prize: {
      caption: '1000$',
    },
  },
];
