import { axiosAuth, axios } from 'api/axios';
import { IBase, IResponse } from 'services/types/api';

import { SERVER_URL } from 'services/constants/constants';
import { ILogin, IUserProfile, IUpdateUserProfile } from './models';

class User {
  static async logIn({ signedSignature }: { signedSignature: string }): Promise<IResponse<ILogin>> {
    const url: string = `${SERVER_URL}/auth`;

    return axios.post<IBase<ILogin>>(url, { signedSignature });
  }

  static async refreshToken({ refreshToken }: { refreshToken: string }) {
    const url: string = `${SERVER_URL}/auth/refresh`;

    return axiosAuth.post<IBase<ILogin>>(url, {
      refreshToken,
    });
  }

  static async getProfile({ userId }: { userId: string | null }) {
    const urlParams = new URLSearchParams('');
    if (userId) {
      urlParams.append('userId', userId.toString());
    }
    const url: string = urlParams.toString();

    return axiosAuth.get<IBase<IUserProfile>>(
      `${SERVER_URL}/user/me` + (url !== '' ? '?' + url : '')
    );
  }

  static async saveUserProfile({
    username,
    email,
    discord,
  }: {
    username: string;
    email: string;
    discord: string;
  }) {
    const url: string = `${SERVER_URL}/user`;

    return axiosAuth.patch<IBase<IUpdateUserProfile>>(url, { username, email, discord });
  }
}

export default User;
