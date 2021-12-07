import React, { useState } from 'react';

// function
import { getUUID } from '../../../../../inside-services/get-uuid/get-uuid';

// types
import { FutureEventType } from '../../../../../inside-services/types/events/events';
import { DIVISION_TO_ICON_MATCH } from '../../../../../inside-services/constants/rating';

interface EventsTabProps {
  loading: boolean;
  events?: [] | Array<FutureEventType>;
}

const EventsTab: React.FC<EventsTabProps> = (props) => {
  const { loading, events } = props;

  const [openedEvent, setOpenedEvent] = useState(null);

  return (
    <section className='main-events-block'>
      <div className='main-events-block_header'>
        <h3>UP TO COMING EVENTS</h3>
      </div>
      {typeof window !== 'undefined' && window.innerWidth > 1024 && (
        <div className='main-events-block_events-list'>
          <div className='columns'>
            <div className='e-name'>
              <span>event name</span>
            </div>
            <div className='e-division'>
              <span>division</span>
            </div>
            <div className='e-entry-fee'>
              <span>entry fee</span>
            </div>
            <div className='e-prize-pool'>
              <span>prize pool</span>
            </div>
            <div className='e-players'>
              <span>players</span>
            </div>
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
              events.map((el: FutureEventType): JSX.Element => {
                const { id, name, division, entryFee, prizePool } = el;

                return (
                  <div className='event-item' key={id}>
                    <div className='e-name'>
                      <span>{name}</span>
                    </div>
                    <div className='e-division'>
                      <div className='division-container'>
                        <span>{division}</span>
                        {DIVISION_TO_ICON_MATCH[division]}
                      </div>
                    </div>
                    <div className='e-entry-fee'>
                      <span>{entryFee}$</span>
                    </div>
                    <div className='e-prize-pool'>
                      <span>{prizePool}$</span>
                    </div>
                    <div className='e-players'>
                      <span>3/9</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {typeof window !== 'undefined' && window.innerWidth <= 1024 && <></>}
    </section>
  );
};

export default EventsTab;
