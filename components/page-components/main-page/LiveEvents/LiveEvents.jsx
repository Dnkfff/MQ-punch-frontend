import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

// components
import LiveEventItem from '../LiveEventItem/LiveEventItem';

// functions & constants
import { getUUID } from '../../../../inside-services/get-uuid/get-uuid';

const LiveEvents = () => {
  const liveEventsLoading = useSelector((state) => state.tournaments.live_events_loading);
  const liveEvents = useSelector((state) => state.tournaments.live_events);
  // const liveEvents = [
  //   {
  //     name: 'Grand Ukrainian Tournament',
  //     prizePool: '100',
  //     division: 'golden',
  //     playingTimer: 30000,
  //     id: getUUID(),
  //   },
  //   {
  //     name: 'Grand Ukrainian Tournament',
  //     prizePool: '100',
  //     division: 'golden',
  //     playingTimer: 45000,
  //     id: getUUID(),
  //   },
  //   {
  //     name: 'Grand Ukrainian Tournament',
  //     prizePool: '100',
  //     division: 'golden',
  //     playingTimer: 60000,
  //     id: getUUID(),
  //   },
  //   {
  //     name: 'Grand Ukrainian Tournament',
  //     prizePool: '100',
  //     division: 'golden',
  //     playingTimer: 60000,
  //     id: getUUID(),
  //   },
  //   {
  //     name: 'Grand Ukrainian Tournament',
  //     prizePool: '100',
  //     division: 'golden',
  //     playingTimer: 60000,
  //     id: getUUID(),
  //   },
  // ];

  console.log(liveEvents);

  const skeletonEvents = useMemo(
    () => [
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
    ],
    []
  );

  return (
    <div className='mq-punch-live-events'>
      <div className='live-events-header'>
        <div className='line' />
        <button className='scroll-arrow'>
          <i className='fas fa-angle-double-left'></i>
        </button>
        <h3 className='live-events-title'>live events</h3>
        <button className='scroll-arrow'>
          <i className='fas fa-angle-double-right'></i>
        </button>
        <div className='line' />
      </div>
      <div className='live-events-content'>
        {liveEventsLoading &&
          skeletonEvents.map((el) => <LiveEventItem key={el.id} loading={true} />)}
        {!liveEventsLoading &&
          liveEvents &&
          liveEvents.length !== 0 &&
          liveEvents.map((el) => <LiveEventItem event={el} key={el.id} loading={false} />)}
        {!liveEventsLoading && liveEvents && liveEvents.length === 0 && (
          <LiveEventItem event={null} loading={false} />
        )}
      </div>
    </div>
  );
};

export default LiveEvents;
