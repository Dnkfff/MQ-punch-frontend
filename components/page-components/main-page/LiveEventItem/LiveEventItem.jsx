import React from 'react';

// assets
import goldenCup from '../../../../assets/website/division_icons/preview_first/golden.png';
import silverCup from '../../../../assets/website/division_icons/preview_first/silver.svg';
import bronzeCup from '../../../../assets/website/division_icons/preview_first/bronze.svg';

const LiveEventItem = ({ event }) => {
  return (
    <div className='live-event-single-event'>
      <div className='live-event-single-event_header'>
        <h4 className='title'>{event.name}</h4>
        <div className='divisions'>
          <img src={goldenCup.src} />
          <img src={silverCup.src} />
          <img src={bronzeCup.src} />
        </div>
      </div>
      <div className='live-event-single-event_content'>
        <span className='final-part'>1/4 final</span>
        <div className='timer-to-start'>
          <span>10:00</span>
        </div>
        <span className='prize-pool'>
          <b>$</b>
          {event.prizePool}
        </span>
      </div>
      <div className='live-label'>
        <span>live</span>
      </div>
    </div>
  );
};

export default LiveEventItem;
