import { axiosAuth, axios } from 'api/axios';

import { SERVER_URL } from 'inside-services/constants/constants';

interface IUpdateUserProfile {
  email: string;
  discord: string;
  username: string;
}

class User {
  static async logIn({ signedSignature }) {
    const url = `${SERVER_URL}/auth`;

    return axios.post(url, { signedSignature });
  }

  static async refreshToken({ refreshToken }) {
    const url = `${SERVER_URL}/auth/refresh`;

    return axiosAuth.post(url, {
      refreshToken,
    });
  }

  static async getProfile({ userId }) {
    const urlParams = new URLSearchParams('');
    if (userId) {
      urlParams.append('userId', userId);
    }
    const url = urlParams.toString();

    return axiosAuth.get(`${SERVER_URL}/user/me` + (url !== '' ? '?' + url : ''));
  }

  static async saveUserProfile({ username, email, discord }) {
    const url = `${SERVER_URL}/user`;

    return axiosAuth.patch(url, { username, email, discord });
  }

  static async getBoxersInWallet({ userId }) {
    const url = `${SERVER_URL}/boxer/all?ownerId=${userId}`;

    return axiosAuth.get(url);
  }
}

export default User;
