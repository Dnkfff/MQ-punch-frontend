import axios from 'axios';
import { axiosAuth } from '..';

import { SERVER_URL } from '../../inside-services/constants/constants';

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

  static async saveUserProfile({ username, email, discord }) {
    const aAxios = axiosAuth();
    const url = `${SERVER_URL}/user`;

    return aAxios.patch(url, { username, email, discord });
  }

  static async getBoxersInWallet({ userId }) {
    const aAxios = axiosAuth();
    const url = `${SERVER_URL}/boxer/all?ownerId=${userId}`;

    return aAxios.get(url);
  }
}

export default User;
