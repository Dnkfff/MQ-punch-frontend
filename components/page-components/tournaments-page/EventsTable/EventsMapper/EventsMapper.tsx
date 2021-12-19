import cn from 'classnames';

// types
import { FutureEventType } from '../../../../../inside-services/types/events/events';
import { DIVISION_TO_ICON_MATCH } from '../../../../../inside-services/constants/rating';

// components
import { OpenedEventPreview } from '../OpenedEventPreview/OpenedEventPreview';

interface EventsMapperInterface {
  el: FutureEventType;
  openedEvent: any;
  setOpenedEvent: any;
}

export const EventsMapper: React.FC<EventsMapperInterface> = (props) => {
  const { el, openedEvent, setOpenedEvent } = props;
  const { name, division, entryFee, prizePool, id, eventPlayers, countOfPlayers } = el;
  const eventIsOpened = openedEvent?.id === el.id;

  const currentPlayersCount: number = eventPlayers.length;
  const playersString: string = `${currentPlayersCount} / ${countOfPlayers}`;

  return (
    <>
      <div
        className={cn('ET-event-item', { opened: eventIsOpened })}
        onClick={() => (eventIsOpened ? setOpenedEvent(null) : setOpenedEvent(el))}
        key={id}
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
          <span>{playersString}</span>
        </div>
      </div>
      {eventIsOpened && (
        <OpenedEventPreview openedEvent={openedEvent} setOpenedEvent={setOpenedEvent} />
      )}
    </>
  );
};
