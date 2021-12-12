import React from 'react';

// components
import TournamentsTopMenu from '../../../components/page-components/tournaments-page/TournamentsTopMenu/TournamentsTopMenu';
import LiveEvents from '../../../components/page-components/main-page/LiveEvents/LiveEvents';
import MainEventsBlock from '../../../components/page-components/tournaments-page/MainEventsBlock/MainEventsBlock';

// constants
import { EVENTS_PAGE_LABEL } from '../../../inside-services/constants/events';

const TournamentsEvents = () => {
  return (
    <div className='global-tournaments-page-container'>
      <TournamentsTopMenu />
      {/* <div className='live-events-block'>
        <h3 className='live-events-block-title'>Live events</h3>
        <LiveEvents />
      </div> */}
      <MainEventsBlock type={EVENTS_PAGE_LABEL} />
    </div>
  );
};

export default TournamentsEvents;
