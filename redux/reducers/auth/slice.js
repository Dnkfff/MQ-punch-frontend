import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const onLogIn = createAsyncThunk('auth/login', async ({ signature, metamaskAddress }) => {
  const loginResult = await axios.post('http://localhost:8080/auth', {
    signedSignature: signature,
  });

  return { ...loginResult.data, metamaskAddress };
});

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    authLoading: false,
    authError: false,
  },
  extraReducers: {
    [onLogIn.pending]: (state) => {
      state.authLoading = true;
      state.authError = false;
      state.user = null;
      window.localStorage.removeItem('user');
    },
    [onLogIn.fulfilled]: (state, { payload }) => {
      state.authLoading = false;
      state.authError = false;
      state.user = {
        metamaskAccount: payload.metamaskAddress,
        token: payload.token,
      };
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          metamaskAddress: payload.metamaskAddress,
          token: payload.token,
          lastRefresh: new Date(),
        })
      );
    },
    [onLogIn.rejected]: (state) => {
      state.authLoading = false;
      state.authError = true;
      state.user = null;
      window.localStorage.removeItem('user');
    },
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
