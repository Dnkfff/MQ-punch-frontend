import axios from 'axios';
import { axiosAuth } from '..';

import { SERVER_URL } from '../../inside-services/constants/constants';

class User {
  static async logIn({ signedSignature }) {
    const url = `${SERVER_URL}/auth`;

    return axios.post(url, { signedSignature });
  }

  static async refreshToken({ refreshToken }) {
    const aAxios = axiosAuth();
    const url = `${SERVER_URL}/auth/refresh`;

    return aAxios.post(url, {
      refreshToken,
    });
  }

  static async getProfile() {
    const aAxios = axiosAuth();
    const url = `${SERVER_URL}/user/me`;

    return aAxios.get(url);
  }
}

export default User;
