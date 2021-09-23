import React from 'react';

// assets
import liveEventPicture from '../../../../assets/website/live_event_picture.svg';

const LiveEventItem = ({ event }) => {
  return (
    <div className='live-event-single-event'>
      <h4 className='title'>{event.name}</h4>
      <span>{event.prizePool}</span>
      <img src={liveEventPicture.src} />
    </div>
  );
};

export default LiveEventItem;
