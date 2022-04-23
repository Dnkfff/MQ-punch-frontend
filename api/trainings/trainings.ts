import { axiosAuth } from 'api/axios';
import { IBase } from 'services/types/api';

// constants
import { SERVER_URL } from 'services/constants/constants';

class TrainingAPI {
  static startTraining({
    boxerId,
    type,
    isFree,
  }: {
    boxerId: string;
    type: string;
    isFree: boolean;
  }) {
    const url: string = `${SERVER_URL}/training`;
    return axiosAuth.post<IBase<undefined>>(url, {
      boxerId,
      type,
      isFree,
    });
  }
}

export default TrainingAPI;
