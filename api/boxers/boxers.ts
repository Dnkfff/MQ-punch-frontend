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

class BoxersAPI {
  static getBoxersByUserId({ userId }) {
    const url = `${SERVER_URL}/user/${userId}/boxers`;
    return axios.get(url);
  }

  static getBoxerTrainingInfo({ boxerId, abortController }) {
    const url = `${SERVER_URL}/boxer/${boxerId}/training`;
    return axios.get(url, {
      signal: abortController ? abortController.signal: undefined,
    });
  }
}

export default BoxersAPI;
