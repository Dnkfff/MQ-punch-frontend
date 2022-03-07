import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import store from '../../store';
import { refreshTokenCoolDown } from '../../../inside-services/constants/constants';

export const onLogIn = createAsyncThunk('auth/login', async ({ signature, metamaskAddress }) => {
  const loginResult = await axios.post('https://stage.mq-punch.com/auth', {
    signedSignature: signature,
  });

  if (loginResult?.data?.refreshToken) {
    setTimeout(() => {
      store.dispatch(onRefreshToken({ refreshToken: loginResult.data.refreshToken }));
    }, refreshTokenCoolDown);
  }

  return { ...loginResult.data, metamaskAddress };
});

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
      id: '9b45fa0e-be9f-4a29-954e-8558ba19e72a',
    };
    window.localStorage.setItem(
      'user',
      JSON.stringify({
        metamaskAddress: payload.metamaskAddress,
        token: payload.token,
        refreshToken: payload.refreshToken,
        id: '9b45fa0e-be9f-4a29-954e-8558ba19e72a',
      })
    );
  },
  [onLogIn.rejected]: (state) => {
    state.authLoading = false;
    state.authError = true;
    state.user = null;
    window.localStorage.removeItem('user');
  },
};

export const onRefreshToken = createAsyncThunk('auth/refresh-token', async ({ refreshToken }) => {
  const refreshResult = await axios.post('https://stage.mq-punch.com/auth/refresh', {
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
      id: '9b45fa0e-be9f-4a29-954e-8558ba19e72a',
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
  },
});

export const { onLogOut, onResetUserInfo } = slice.actions;

export default slice.reducer;
