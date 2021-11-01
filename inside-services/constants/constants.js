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

// FORM
export const DOUBLE_DATE_SELECTOR_TYPE = 'double-date-selector';
export const DIVISION_SELECTOR_TYPE = 'division-selector';
export const INPUT_TYPE = 'input';

export const tournamentsTopMenuLinks = [
  { label: 'Events', id: getUUID(), pathname: DEFAULT_TOURNAMENTS_SCREEN_ROUTE },
  {
    label: 'Results',
    id: getUUID(),
    pathname: '/tournaments/results',
    filtering: [
      {
        type: DOUBLE_DATE_SELECTOR_TYPE,
        field: 'date',
        placeholder: 'Choose date',
        caption: 'Date',
      },
      {
        type: DIVISION_SELECTOR_TYPE,
        field: 'division',
        placeholder: 'Select division',
        caption: 'Division',
      },
      {
        type: INPUT_TYPE,
        field: 'prizePool',
        placeholder: 'Prize pool',
        caption: 'Prize pool',
        inputType: 'text',
        formatFunc: ({ oldValue, newValue }) => {
          const regex1 = /^\d{1,5}$/;
          const regex2 = /^$/;
          if (!regex1.test(newValue) && !regex2.test(newValue)) return oldValue;

          return newValue;
        },
      },
    ],
  },
  {
    label: 'Your tournaments',
    id: getUUID(),
    pathname: '/tournaments/your-tournaments',
  },
];
