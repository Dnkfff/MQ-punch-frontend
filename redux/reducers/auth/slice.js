import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import User from '../../../api/user/user';
import { getUserProfile, localStorageClearProfile } from '../profile/slice';

import { refreshTokenCoolDown } from '../../../inside-services/constants/constants';

export const localStorageClearAuth = () => {
  window.localStorage.removeItem('user');
};

export const onLogIn = createAsyncThunk(
  'auth/login',
  async ({ signature, metamaskAddress }, thunkAPI) => {
    const loginResult = await User.logIn({ signedSignature: signature });
    console.log(loginResult);

    if (loginResult?.data?.refreshToken) {
      setTimeout(() => {
        thunkAPI.dispatch(onRefreshToken({ refreshToken: loginResult.data.refreshToken }));
      }, refreshTokenCoolDown);
    }
    window.localStorage.setItem(
      'user',
      JSON.stringify({
        metamaskAddress: metamaskAddress,
        token: loginResult.data.token,
        refreshToken: loginResult.data.refreshToken,
      })
    );
    thunkAPI.dispatch(getUserProfile());

    return { ...loginResult.data, metamaskAddress };
  }
);

const loginExtraReducer = {
  [onLogIn.pending]: (state) => {
    state.authLoading = true;
    state.authError = false;
    state.user = null;
  },
  [onLogIn.fulfilled]: (state, { payload }) => {
    state.authLoading = false;
    state.authError = false;
    state.user = {
      metamaskAccount: payload.metamaskAddress,
      token: payload.token,
      refreshToken: payload.refreshToken,
    };
  },
  [onLogIn.rejected]: (state) => {
    state.authLoading = false;
    state.authError = true;
    state.user = null;
    window.localStorage.removeItem('user');
  },
};

export const onRefreshToken = createAsyncThunk(
  'auth/refresh-token',
  async ({ refreshToken }, thunkAPI) => {
    try {
      const refreshResult = await User.refreshToken({ refreshToken });

      if (refreshResult?.data?.refreshToken) {
        setTimeout(() => {
          thunkAPI.dispatch(onRefreshToken({ refreshToken: refreshResult.data.refreshToken }));
        }, refreshTokenCoolDown);
      }

      return { ...refreshResult.data };
    } catch (error) {
      console.log(error);
    }
  }
);

const refreshTokenExtraReducer = {
  [onRefreshToken.pending]: (state) => {
    state.authLoading = true;
    state.authError = false;
    state.user = null;
  },
  [onRefreshToken.fulfilled]: (state, { payload }) => {
    state.authLoading = false;
    state.authError = false;
    state.user = {
      metamaskAccount: payload.metamaskAddress,
      token: payload.token,
      refreshToken: payload.refreshToken,
    };
    const newUserObject = {
      ...JSON.parse(window.localStorage.getItem('user')),
      token: payload.token,
      refreshToken: payload.refreshToken,
    };
    window.localStorage.setItem('user', JSON.stringify(newUserObject));
  },
  [onRefreshToken.rejected]: (state) => {
    state.authLoading = false;
    state.authError = true;
    state.user = null;
    window.localStorage.removeItem('user');
  },
};

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    authLoading: false,
    authError: false,
  },
  extraReducers: {
    // login
    ...loginExtraReducer,

    // refresh
    ...refreshTokenExtraReducer,
  },
  reducers: {
    onLogOut: (state) => {
      state.user = null;
      localStorageClearAuth();
      localStorageClearProfile();
    },
    onResetUserInfo: (state) => {
      state.user = JSON.parse(window.localStorage.getItem('user'));
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
    resetUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { onLogOut, onResetUserInfo, setAuthLoading, resetUser } = slice.actions;

export default slice.reducer;
