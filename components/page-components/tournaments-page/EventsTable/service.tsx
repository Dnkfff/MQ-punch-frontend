import cn from 'classnames';

// types
import { FutureEventType } from '../../../../inside-services/types/events/events';
import { DIVISION_TO_ICON_MATCH } from '../../../../inside-services/constants/rating';

interface EventsMapperInterface {
  el: FutureEventType;
  openedEvent: any;
  setOpenedEvent: any;
}

export const EventsMapper: React.FC<EventsMapperInterface> = (props) => {
  const { el, openedEvent, setOpenedEvent } = props;
  const { name, division, entryFee, prizePool } = el;
  const eventIsOpened = openedEvent?.id === el.id;

  return (
    <>
      <div
        className={cn('ET-event-item', { opened: eventIsOpened })}
        onClick={() => (eventIsOpened ? setOpenedEvent(null) : setOpenedEvent(el))}
        key={el.id}
      >
        <div className='ET-event-item__name'>
          <span>{name}</span>
        </div>
        <div className='ET-event-item__division'>
          <div className='division-container'>
            <span>{division}</span>
            {DIVISION_TO_ICON_MATCH[division]}
          </div>
        </div>
        <div className='ET-event-item__entry-fee'>
          <span>{entryFee}$</span>
        </div>
        <div className='ET-event-item__prize-pool'>
          <span>{prizePool}$</span>
        </div>
        <div className='ET-event-item__players'>
          <span>3/9</span>
        </div>
      </div>
      {eventIsOpened && <p>it is opened</p>}
    </>
  );
};
