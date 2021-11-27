import axios from 'axios';

import { SERVER_URL } from '../../inside-services/constants/constants';

// constants
import { RECORDS_FOR_PAGE } from '../../inside-services/constants/events';

export const pageMatchEventStatus = {};

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

  // TO DO
  // static getAllLiveEvents() {
  //   const url = `${SERVER_URL}/event/all`;
  // }

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

  getEvents() {
    const { status, divisions, page, dateAfter, dateBefore, size } = this;
    const url = `${SERVER_URL}/event/all?status=${status}&page=${page}&size=${size}`;
    if (dateAfter) url = url + `&after=${dateAfter}`;
    if (dateBefore) url = url + `&before=${dateBefore}`;
    if (divisions && divisions.length !== 0) {
      divisions.forEach((division) => {
        url += `&division=${division}`;
      });
    }

    return axios.get(url);
  }
}

export default EventsAPI;
