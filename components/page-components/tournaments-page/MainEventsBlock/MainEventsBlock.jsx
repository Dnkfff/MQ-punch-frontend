import React from 'react';

// functions
import { getUUID } from '../../../../inside-services/get-uuid/get-uuid';

const EVENTS_MOCK = [
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
];

const MainEventsBlock = (props) => {
  return (
    <section className='main-events-block'>
      <div className='main-events-block_header'>
        <h3>CURRENT & UP TO COMING EVENTS</h3>
        <div>select division</div>
      </div>
      <div className='main-events-block_events-list'>
        <div className='signs'>
          <span>event</span>
          <span>location</span>
          <span>event type</span>
          <span>places</span>
          <span>entry fee</span>
          <span>prize pool</span>
          <span>registered</span>
        </div>
        <div className='list'>
          {EVENTS_MOCK.map((el) => (
            <div className='event-item' key={el.id}>
              Some Event
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainEventsBlock;
