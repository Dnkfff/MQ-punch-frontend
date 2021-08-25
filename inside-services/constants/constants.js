import { getUUID } from '../get-uuid/get-uuid';

export const bigHeaderMenuLinks = [
  { label: 'Market', id: getUUID(), pathname: '/market' },
  {
    label: 'Tournaments',
    id: getUUID(),
    pathname: '/tournaments',
  },
  { label: 'Gym', id: getUUID(), pathname: '/gym' },
  {
    label: 'Leaderboard',
    id: getUUID(),
    pathname: '/leaderboard',
  },
  { label: 'Learn', id: getUUID(), pathname: '/learn' },
];

export const scrollStickyHeaderLength = 270;
