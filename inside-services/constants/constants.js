import { getUUID } from '../get-uuid/get-uuid';

// in miliseconds ( one hour )
export const refreshTokenCoolDown = 60 * 60 * 1000;

export const DEFAULT_TOURNAMENTS_SCREEN_ROUTE = '/tournaments/events';

export const bigHeaderMenuLinks = [
  { label: 'Market', id: getUUID(), pathname: '/market' },
  {
    label: 'Tournaments',
    id: getUUID(),
    pathname: DEFAULT_TOURNAMENTS_SCREEN_ROUTE,
  },
  { label: 'Gym', id: getUUID(), pathname: '/gym' },
  {
    label: 'Leaderboard',
    id: getUUID(),
    pathname: '/leaderboard',
  },
  { label: 'Learn', id: getUUID(), pathname: '/learn' },
];

export const tournamentsTopMenuLinks = [
  { label: 'Events', id: getUUID(), pathname: DEFAULT_TOURNAMENTS_SCREEN_ROUTE },
  { label: 'Results', id: getUUID(), pathname: '/tournaments/results' },
  { label: 'Your tournaments', id: getUUID(), pathname: '/tournaments/your-tournaments' },
];
