import React, { useState, useEffect } from 'react';
import InfiniteScroller from 'react-infinite-scroller';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

// components
import Spinner from '../../../UI/Spinner/Spinner';

// function
import { getUUID } from '../../../../inside-services/get-uuid/get-uuid';
import { setPageSearchResult } from '../../../../redux/reducers/tournaments/slice';

// service
import { EventsMapper } from './service';
// api
import EventsAPI from '../../../../api/events/events';
// constants
import {
  pageMatchEventStatus,
  EVENTS_PAGE_LABEL,
} from '../../../../inside-services/constants/events';

// types
import { FutureEventType } from '../../../../inside-services/types/events/events';

interface EventsTabProps {
  eventsLoading: boolean;
  eventsPaginationLoading: boolean;
  events?: [] | Array<FutureEventType>;
  metaData: any;
}

const EventsTable: React.FC<EventsTabProps> = (props) => {
  const { eventsLoading, eventsPaginationLoading, events, metaData } = props;
  const dispatch = useDispatch();

  const eventsAPI = new EventsAPI();
  eventsAPI.setPageParameters({ status: 'future' });
  eventsAPI.setNewPaginationState({ page: 0 });

  const [openedEvent, setOpenedEvent] = useState(null);

  const screenWidthDesktop: boolean = typeof window !== 'undefined' && window.innerWidth > 1024;
  const screenWidthMobile: boolean = typeof window !== 'undefined' && window.innerWidth <= 1024;

  const eventsNotFound: boolean = !eventsLoading && events && events.length === 0;
  const eventsExist: boolean = !eventsLoading && events && events.length !== 0;

  const tableIsFull: boolean = events && events.length >= metaData.totalRows;

  useEffect(() => {
    // get page events function
    getPageEvents();
  }, [eventsAPI.page]);

  return (
    <section className='main-events-block'>
      <div className='main-events-block_header'>
        <h3>UP TO COMING EVENTS</h3>
      </div>
      {screenWidthDesktop && (
        <div className='main-events-block_events-list'>
          <div className='columns'>
            <div className='e-name'>
              <span>event name</span>
            </div>
            <div className='e-division'>
              <span>division</span>
            </div>
            <div className='e-entry-fee'>
              <span>entry fee</span>
            </div>
            <div className='e-prize-pool'>
              <span>prize pool</span>
            </div>
            <div className='e-players'>
              <span>players</span>
            </div>
          </div>
          <div className={cn('body', 'ET-body')}>
            {eventsLoading &&
              Array(20)
                .fill(null)
                .map(
                  (_, index): JSX.Element => (
                    <div className={cn('ET-event-item', 'skeleton')} key={index + getUUID()}>
                      <span className='ET-event-item__name'>
                        <div />
                      </span>
                      <span className='ET-event-item__division'>
                        <div />
                      </span>
                      <span className='ET-event-item__entry-fee'>
                        <div />
                      </span>
                      <span className='ET-event-item__prize-pool'>
                        <div />
                      </span>
                      <span className='ET-event-item__players'>
                        <div />
                      </span>
                    </div>
                  )
                )}
            {eventsNotFound && (
              <div className='not-found'>
                <span>EVENTS NOT FOUND</span>
              </div>
            )}
            {eventsExist && (
              <InfiniteScroller
                loadMore={
                  !tableIsFull && !eventsLoading && !eventsPaginationLoading
                    ? () => {
                        eventsAPI.setNewPaginationState({ page: eventsAPI.page + 1 });
                        getPageEvents();
                      }
                    : null
                }
                hasMore={!tableIsFull && !eventsLoading && !eventsPaginationLoading}
              >
                {events.map(
                  (el: FutureEventType): JSX.Element => (
                    <EventsMapper
                      el={el}
                      openedEvent={openedEvent}
                      setOpenedEvent={setOpenedEvent}
                    />
                  )
                )}
                {eventsPaginationLoading && (
                  <div className='loader-container'>
                    <Spinner />
                  </div>
                )}
              </InfiniteScroller>
            )}
          </div>
        </div>
      )}
      {screenWidthMobile && <></>}
    </section>
  );

  async function getPageEvents() {
    eventsAPI.setPageParameters({
      status: pageMatchEventStatus[EVENTS_PAGE_LABEL],
    });
    const eventsResult = await eventsAPI.getEvents();

    if (
      eventsResult &&
      eventsResult.data &&
      eventsResult.metaData &&
      eventsResult.data.length !== 0
    ) {
      const newSearchResult =
        eventsAPI.page === 0 ? eventsResult.data : [...events].concat(eventsResult.data);

      return dispatch(
        setPageSearchResult({
          searchResult: newSearchResult,
          metaData: eventsResult.metaData,
          page: EVENTS_PAGE_LABEL,
        })
      );
    }

    return setPageSearchResult({
      searchResult: [],
      metaData: { totalRows: 0 },
      page: EVENTS_PAGE_LABEL,
    });
  }
};

export default EventsTable;
