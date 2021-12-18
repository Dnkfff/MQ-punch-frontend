import axios from 'axios';

// redux
import store from '../../redux/store';
import {
  setLiveEvents,
  setLiveEventsLoading,
  setEventsLoading,
  setEventsPaginationLoading,
} from '../../redux/reducers/tournaments/slice';

// constants
import { SERVER_URL } from '../../inside-services/constants/constants';
import { RECORDS_FOR_PAGE } from '../../inside-services/constants/events';

class EventsAPI {
  constructor() {
    const DEFAULT_EVENT_STATUS = 'future';

    this.status = DEFAULT_EVENT_STATUS;
    this.divisions = null;
    this.dateAfter = null;
    this.dateBefore = null;
    this.page = 0;
    this.size = RECORDS_FOR_PAGE;
  }

  static getEventById({ id }) {
    const url = `${SERVER_URL}/event/id/${id}`;

    return axios.get(url);
  }

  static async getAllLiveEvents() {
    const url = `${SERVER_URL}/event/all?status=live&page=0&size=10`;

    let response = null;
    store.dispatch(setLiveEventsLoading(true));
    store.dispatch(setLiveEvents(null));
    try {
      response = await axios.get(url);
    } catch (error) {
      // TO DO UPDATE ERROR STATE
    } finally {
      store.dispatch(setLiveEventsLoading(false));
    }

    if (response && response.data?.data && response.data?.data.length !== 0) {
      return store.dispatch(setLiveEvents(response.data.data));
    }
    return store.dispatch(setLiveEvents([]));
  }

  setPageParameters(params) {
    const { status, dateAfter, dateBefore, divisions } = params;

    this.status = status;
    this.dateAfter = dateAfter;
    this.dateBefore = dateBefore;
    this.divisions = divisions;
  }

  setNewPaginationState(paginationState) {
    const { page } = paginationState;

    this.page = page;
  }

  async getEvents() {
    const { status, divisions, page, dateAfter, dateBefore, size } = this;
    const url = `${SERVER_URL}/event/all?status=${status}&page=${page}&size=${size}`;
    if (dateAfter) url = url + `&after=${dateAfter}`;
    if (dateBefore) url = url + `&before=${dateBefore}`;
    if (divisions && divisions.length !== 0) {
      divisions.forEach((division) => {
        url += `&division=${division}`;
      });
    }

    let response = null;

    if (page === 0) {
      store.dispatch(setEventsLoading(true));
    } else {
      store.dispatch(setEventsPaginationLoading(true));
    }

    try {
      response = await axios.get(url);
    } catch (error) {
      console.log(error);
      // TO DO
    } finally {
      setTimeout(() => {
        store.dispatch(setEventsLoading(false));
        store.dispatch(setEventsPaginationLoading(false));
      }, 3000);
    }

    return response?.data || [];
  }
}

export default EventsAPI;
