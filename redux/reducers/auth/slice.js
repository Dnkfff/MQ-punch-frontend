import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import store from '../../store';

import { getUserProfile } from '../profile/slice';

import { refreshTokenCoolDown, SERVER_URL } from '../../../inside-services/constants/constants';

export const onLogIn = createAsyncThunk(
  'auth/login',
  async ({ signature, metamaskAddress }, thunkAPI) => {
    const url = `${SERVER_URL}/auth`;
    const loginResult = await axios.post(url, {
      signedSignature: signature,
    });

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

export const onRefreshToken = createAsyncThunk('auth/refresh-token', async ({ refreshToken }) => {
  const url = `${SERVER_URL}/auth/refresh`;
  const refreshResult = await axios.post(url, {
    refreshToken,
  });

  if (refreshResult?.data?.refreshToken) {
    setTimeout(() => {
      store.dispatch(onRefreshToken({ refreshToken: refreshResult.data.refreshToken }));
    }, refreshTokenCoolDown);
  }

  return { ...refreshResult.data };
});

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
      window.localStorage.removeItem('user');
    },
    onResetUserInfo: (state) => {
      state.user = JSON.parse(window.localStorage.getItem('user'));
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
  },
});

export const { onLogOut, onResetUserInfo, setAuthLoading } = slice.actions;

export default slice.reducer;
