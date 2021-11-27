import { getUUID } from '../get-uuid/get-uuid';

import { DOUBLE_DATE_SELECTOR_TYPE, DIVISION_SELECTOR_TYPE, INPUT_TYPE } from './form';

// EVENTS CONSTANTS
export const DEFAULT_TOURNAMENTS_SCREEN_ROUTE = '/tournaments/events';

export const EVENT_FINISHED_STATUS = 'finished';
export const EVENT_LIVE_STATUS = 'live';
export const EVENT_FUTURE_STATUS = 'future';

export const DEFAULT_EVENT_STATUS = EVENT_FUTURE_STATUS;

export const EVENTS_PAGE_LABEL = 'Events';
export const RESULTS_PAGE_LABEL = 'Results';
export const YOUR_TOURNAMENTS_PAGE_LABEL = 'Your tournaments';
export const RECORDS_FOR_PAGE = 10;

export const pageMatchEventStatus = {
  [EVENTS_PAGE_LABEL]: EVENT_FUTURE_STATUS,
  [RESULTS_PAGE_LABEL]: EVENT_FINISHED_STATUS,
  [YOUR_TOURNAMENTS_PAGE_LABEL]: EVENT_FINISHED_STATUS, // TO DO
};

export const tournamentsTopMenuLinks = [
  { label: EVENTS_PAGE_LABEL, id: getUUID(), pathname: DEFAULT_TOURNAMENTS_SCREEN_ROUTE },
  {
    label: RESULTS_PAGE_LABEL,
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
    label: YOUR_TOURNAMENTS_PAGE_LABEL,
    id: getUUID(),
    pathname: '/tournaments/your-tournaments',
  },
];
