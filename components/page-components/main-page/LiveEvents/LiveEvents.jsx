import React from 'react';

// components
import LiveEventItem from '../LiveEventItem/LiveEventItem';

// functions & constants
import { getUUID } from '../../../../inside-services/get-uuid/get-uuid';

const LiveEvents = () => {
  const liveEvensArray = [
    {
      name: 'Grand Ukrainian Tournament',
      prizePool: '100',
      division: 'golden',
      playingTimer: 30000,
      id: getUUID(),
    },
    {
      name: 'Grand Ukrainian Tournament',
      prizePool: '100',
      division: 'golden',
      playingTimer: 45000,
      id: getUUID(),
    },
    {
      name: 'Grand Ukrainian Tournament',
      prizePool: '100',
      division: 'golden',
      playingTimer: 60000,
      id: getUUID(),
    },
    {
      name: 'Grand Ukrainian Tournament',
      prizePool: '100',
      division: 'golden',
      playingTimer: 60000,
      id: getUUID(),
    },
    {
      name: 'Grand Ukrainian Tournament',
      prizePool: '100',
      division: 'golden',
      playingTimer: 60000,
      id: getUUID(),
    },
  ];

  return (
    <div className='live-events'>
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
        {liveEvensArray.map((el) => (
          <LiveEventItem event={el} key={el.id} />
        ))}
      </div>
    </div>
  );
};

export default LiveEvents;
