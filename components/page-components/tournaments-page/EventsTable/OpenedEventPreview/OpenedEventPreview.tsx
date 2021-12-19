import React from 'react';
import cn from 'classnames';

interface OpenedEventPreviewInterface {
  openedEvent: any;
  setOpenedEvent: any;
}

export const OpenedEventPreview: React.FC<OpenedEventPreviewInterface> = (props) => {
  const { openedEvent, setOpenedEvent } = props;
  const { name } = openedEvent;

  return (
    <section className={cn('ET-opened-event', 'opened')}>
      <div className='close-button' onClick={() => setOpenedEvent(null)}>
        <i className='fal fa-times' />
      </div>
      <div className='ET-opened-event__header'>
        <div className='ET-opened-event__header__top'>
          <h3 className='ET-opened-event__name'>{name}</h3>
          <div className='division-container'>all divisions here</div>
          <div className='average-info'>average trofies and etc...</div>
        </div>
        <div className='ET-opened-event__header__bottom'>
          <div className='starts-at'>TIMER</div>
          <div className='registered'>0/12</div>
        </div>
      </div>
      <section className='ET-opened-event__main'>
        {}
        <div className='join'>+ JOIN</div>
      </section>
    </section>
  );
};
