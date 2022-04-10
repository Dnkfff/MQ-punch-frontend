import React from 'react';
import cn from 'classnames';
import moment from 'moment';
import { useTypedSelector as useSelector } from '../../../../../redux/store';

// types
import { PlayerType } from 'services/types/events/events';

interface OpenedEventPreviewInterface {
  openedEvent: any;
  setOpenedEvent: any;
}

export const OpenedEventPreview: React.FC<OpenedEventPreviewInterface> = (props) => {
  const { openedEvent, setOpenedEvent } = props;
  const { name, eventPlayers, countOfPlayers, startsAt } = openedEvent;
  const userRegistered = !!useSelector((state) => state.auth.user);

  const eventPlayersIsValid: boolean = eventPlayers && eventPlayers.length !== 0;
  const userCanJoin: boolean =
    userRegistered && eventPlayers && eventPlayers.length < Number(countOfPlayers);

  const currentPlayersCount: number = eventPlayers.length;
  const playersString: string = `${currentPlayersCount} / ${countOfPlayers}`;

  return (
    <section className={cn('ET-opened-event', 'opened')}>
      <div className='close-button' onClick={() => setOpenedEvent(null)}>
        <i className='fal fa-times' />
      </div>
      <div className='ET-opened-event__header'>
        <div className='ET-opened-event__header__top'>
          <h3 className='ET-opened-event__name'>{name}</h3>
          <div className='division-container'>all divisions here</div>
          <div className='average-info'>average trophies and etc...</div>
        </div>
        <div className='ET-opened-event__header__bottom'>
          <div className='starts-at'>{`Start at: ${moment(startsAt).format('HH:MM')}`}</div>
          <div className='registered'>{`Registered: ${playersString}`}</div>
        </div>
      </div>
      <section className='ET-opened-event__main'>
        {eventPlayersIsValid &&
          eventPlayers.map((player: PlayerType): JSX.Element => {
            const { id, boxer } = player;
            const { logo, name } = boxer;
            return (
              <div className='player' key={id}>
                <img src={logo} />
                <span>{name}</span>
              </div>
            );
          })}
        {userCanJoin && (
          <div className='join'>
            <span>+ JOIN</span>
          </div>
        )}
      </section>
    </section>
  );
};
