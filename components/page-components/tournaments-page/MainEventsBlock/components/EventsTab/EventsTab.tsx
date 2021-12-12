import React, { useState } from 'react';
import cn from 'classnames';

// function
import { getUUID } from '../../../../../../inside-services/get-uuid/get-uuid';

// service
import { EventsMapper } from './service';

// types
import { FutureEventType } from '../../../../../../inside-services/types/events/events';

interface EventsTabProps {
  loading: boolean;
  events?: [] | Array<FutureEventType>;
}

const EventsTab: React.FC<EventsTabProps> = (props) => {
  const { loading, events } = props;

  const [openedEvent, setOpenedEvent] = useState(null);

  const screenWidthDesktop = typeof window !== 'undefined' && window.innerWidth > 1024;
  const screenWidthMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;

  const eventsNotFound = !loading && events && events.length === 0;
  const eventsExist = !loading && events && events.length !== 0;

  return (
    <section className='main-events-block'>
      <div className='main-events-block_header'>
        <h3>UP TO COMING EVENTS</h3>
      </div>
      {screenWidthDesktop && (
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
          <div className={cn('body', 'ET-body')}>
            {loading &&
              Array(20)
                .fill(null)
                .map(
                  (_, index): JSX.Element => (
                    <div className={cn('ET-event-item', 'skeleton')} key={index + getUUID()}>
                      <span className='ET-event-item__name'>
                        <div />
                      </span>
                      <span className='ET-event-item__division'>
                        <div />
                      </span>
                      <span className='ET-event-item__entry-fee'>
                        <div />
                      </span>
                      <span className='ET-event-item__prize-pool'>
                        <div />
                      </span>
                      <span className='ET-event-item__players'>
                        <div />
                      </span>
                    </div>
                  )
                )}
            {eventsNotFound && (
              <div className='not-found'>
                <span>EVENTS NOT FOUND</span>
              </div>
            )}
            {eventsExist &&
              events.map(
                (el: FutureEventType): JSX.Element => (
                  <EventsMapper
                    key={el.id}
                    el={el}
                    openedEvent={openedEvent}
                    setOpenedEvent={setOpenedEvent}
                  />
                )
              )}
          </div>
        </div>
      )}
      {screenWidthMobile && <></>}
    </section>
  );
};

export default EventsTab;
