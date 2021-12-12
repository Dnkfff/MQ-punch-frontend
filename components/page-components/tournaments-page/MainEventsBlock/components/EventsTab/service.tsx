import cn from 'classnames';

// types
import { FutureEventType } from '../../../../../../inside-services/types/events/events';
import { DIVISION_TO_ICON_MATCH } from '../../../../../../inside-services/constants/rating';

interface EventsMapperInterface {
  el: FutureEventType;
  openedEvent: any;
  setOpenedEvent: any;
  key: string;
}

export const EventsMapper: React.FC<EventsMapperInterface> = (props) => {
  const { el, openedEvent, setOpenedEvent } = props;
  const { name, division, entryFee, prizePool } = el;
  const eventIsOpened = openedEvent?.id === el.id;

  return (
    <>
      <div
        className={cn('event-item', { opened: eventIsOpened })}
        onClick={() => (eventIsOpened ? setOpenedEvent(null) : setOpenedEvent(el))}
      >
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
      {eventIsOpened && <p>it is opened</p>}
    </>
  );
};
