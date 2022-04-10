import React from 'react';
import { useSelector } from 'react-redux';

// components
import TournamentsTopMenu from '../../../components/page-components/tournaments-page/TournamentsTopMenu/TournamentsTopMenu';
import LiveEvents from '../../../components/page-components/main-page/LiveEvents/LiveEvents';
import EventsTable from '../../../components/page-components/tournaments-page/EventsTable/EventsTable';

// types
import { EVENTS_PAGE_LABEL } from 'services/constants/events';

const TournamentsEvents = () => {
  const eventsLoading = useSelector((state) => state.tournaments.events_loading);
  const eventsPaginationLoading = useSelector(
    (state) => state.tournaments.events_pagination_loading
  );
  const events = useSelector((state) =>
    state.tournaments[EVENTS_PAGE_LABEL] ? state.tournaments[EVENTS_PAGE_LABEL].searchResult : null
  );
  const metaData = useSelector((state) =>
    state.tournaments[EVENTS_PAGE_LABEL]
      ? state.tournaments[EVENTS_PAGE_LABEL].metaData
      : { totalRows: 0 }
  );

  return (
    <div className='global-tournaments-page-container'>
      <TournamentsTopMenu />
      {/* <div className='live-events-block'>
        <h3 className='live-events-block-title'>Live events</h3>
        <LiveEvents />
      </div> */}
      <EventsTable
        eventsLoading={eventsLoading}
        eventsPaginationLoading={eventsPaginationLoading}
        events={events}
        metaData={metaData}
      />
    </div>
  );
};

export default TournamentsEvents;
