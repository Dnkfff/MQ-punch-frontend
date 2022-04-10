import React from 'react';
import { useSelector } from 'react-redux';

// components
import EventsTab from './components/EventsTab/EventsTab';

// constants
import {
  EVENTS_PAGE_LABEL,
  RESULTS_PAGE_LABEL,
  YOUR_TOURNAMENTS_PAGE_LABEL,
} from 'services/constants/events';

const MainEventsBlock = (props) => {
  const { type } = props;
  const eventsLoading = useSelector((state) => state.tournaments.events_loading);
  const events = useSelector((state) =>
    state.tournaments[type] ? state.tournaments[type].searchResult : null
  );
  const metaData = useSelector((state) =>
    state.tournaments[type] ? state.tournaments[type].metaData : { totalRows: 0 }
  );

  if (type === EVENTS_PAGE_LABEL) {
    return <EventsTab loading={eventsLoading} events={events} metaData={metaData} />;
  }
};

export default MainEventsBlock;
