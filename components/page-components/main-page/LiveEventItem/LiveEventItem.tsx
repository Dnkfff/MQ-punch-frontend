import React, { FunctionComponent } from 'react';

// types
import { LiveEventType } from '../../../../inside-services/types/events/events';

// assets
import goldenCup from '../../../../assets/website/division_icons/preview_first/golden.png';

interface LiveEventItemProps {
  event?: LiveEventType;
  loading: boolean;
}

const LiveEventItem: FunctionComponent<LiveEventItemProps> = ({ event, loading }) => {
  if (!loading && !event) {
    return <div className='live-event-single-event'></div>;
  }

  if (loading) {
    return <div className='live-event-single-event'></div>;
  }

  if (event) {
    return (
      <div className='live-event-single-event'>
        <div className='live-event-single-event_header'>
          <h4 className='title'>{event.name}</h4>
          <div className='divisions'>
            <img src={goldenCup.src} />
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
  }
};

export default LiveEventItem;
