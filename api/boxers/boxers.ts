import { axiosAuth } from 'api/axios';
import { IBase } from 'services/types/api';

// types
import { IPersonalBoxer } from './models';

// constants
import { SERVER_URL } from 'services/constants/constants';

class BoxersAPI {
  static getBoxerTrainingInfo({ boxerId }) {
    const url = `${SERVER_URL}/boxer/${boxerId}/training`;
    return axiosAuth.get(url);
  }

  static async getBoxersByUserId({ userId }: { userId: string }) {
    const url: string = `${SERVER_URL}/boxer/all?ownerId=${userId}`;

    return axiosAuth.get<IBase<{ boxers: IPersonalBoxer[] }>>(url);
  }
}

export default BoxersAPI;
