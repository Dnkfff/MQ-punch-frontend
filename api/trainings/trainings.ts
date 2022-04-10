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
import { SERVER_URL } from 'services/constants/constants';

class TrainingAPI {
  static startTraining({ boxerId, type, isFree }) {
    const url = `${SERVER_URL}/training`;
    return axios.post(url, {
      boxerId,
      type,
      isFree: Boolean(isFree),
    });
  }
}

export default TrainingAPI;
