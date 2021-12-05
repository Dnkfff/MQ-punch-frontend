import React from 'react';

// function
import { getUUID } from '../../../../../inside-services/get-uuid/get-uuid';

// types
import { FutureEventType } from '../../../../../inside-services/types/events/events';

interface EventsTabProps {
  loading: boolean;
  events?: [] | Array<FutureEventType>;
}

const EventsTab: React.FC<EventsTabProps> = (props) => {
  const { loading, events } = props;

  return (
    <section className='main-events-block'>
      <div className='main-events-block_header'>
        <h3>CURRENT & UP TO COMING EVENTS</h3>
        <div>select division</div>
      </div>
      <div className='main-events-block_events-list'>
        <div className='columns'>
          <span className='e-name'>event name</span>
          <span className='e-division'>division</span>
          <span className='e-entry-fee'>entry fee</span>
          <span className='e-prize-pool'>prize pool</span>
          <span className='e-players'>players</span>
        </div>
        <div className='body'>
          {loading &&
            Array(10)
              .fill({ id: getUUID() })
              .map(
                (el): JSX.Element => (
                  <div className='event-item skeleton' key={el.id}>
                    <span className='e-name skeleton' />
                    <span className='e-division skeleton' />
                    <span className='e-entry-fee skeleton' />
                    <span className='e-prize-pool skeleton' />
                    <span className='e-players skeleton' />
                  </div>
                )
              )}
          {!loading && events && events.length === 0 && (
            <div className='not-found'>
              <span>EVENTS NOT FOUND</span>
            </div>
          )}
          {!loading &&
            events &&
            events.length !== 0 &&
            events.map(
              (el: FutureEventType): JSX.Element => (
                <div className='event-item' key={el.id}>
                  <span className='e-name'>event name</span>
                  <span className='e-division'>division</span>
                  <span className='e-entry-fee'>entry fee</span>
                  <span className='e-prize-pool'>prize pool</span>
                  <span className='e-players'>players</span>
                </div>
              )
            )}
        </div>
      </div>
    </section>
  );
};

export default EventsTab;
