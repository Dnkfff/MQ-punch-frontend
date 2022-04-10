import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import User from '../../../api/user/user';
import { getUserProfile, localStorageClearProfile } from '../profile/slice';

import { refreshTokenCoolDown } from 'services/constants/constants';

export const localStorageClearAuth = () => {
  window.localStorage.removeItem('user');
};

export const onLogIn = createAsyncThunk<any, any, any>(
  'auth/login',
  async ({ signature, metamaskAddress }, thunkAPI) => {
    const loginResult = await User.logIn({ signedSignature: signature });

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

export const onRefreshToken = createAsyncThunk<any, any, any>(
  'auth/refresh-token',
  async ({ refreshToken }, thunkAPI) => {
    try {
      const refreshResult = await User.refreshToken({ refreshToken });

      if (refreshResult?.data?.refreshToken) {
        setTimeout(() => {
          thunkAPI.dispatch(onRefreshToken({ refreshToken: refreshResult.data.refreshToken }));
        }, refreshTokenCoolDown);
      } else {
        thunkAPI.dispatch(onLogOut());
      }

      return { ...refreshResult.data };
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(onLogOut());
    }
  }
);

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    authLoading: false,
    authError: false,
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(onLogIn.pending, (state) => {
      state.authLoading = true;
      state.authError = false;
      state.user = null;
    });
    builder.addCase(onLogIn.fulfilled, (state, { payload }) => {
      state.authLoading = false;
      state.authError = false;
      state.user = {
        metamaskAccount: payload?.metamaskAddress,
        token: payload?.token,
        refreshToken: payload?.refreshToken,
      };
    });
    builder.addCase(onLogIn.rejected, (state) => {
      state.authLoading = false;
      state.authError = true;
      state.user = null;
      window.localStorage.removeItem('user');
    });

    // refresh
    builder.addCase(onRefreshToken.pending, (state) => {
      state.authLoading = true;
      state.authError = false;
    });
    builder.addCase(onRefreshToken.fulfilled, (state, { payload }) => {
      state.authLoading = false;
      state.authError = false;
      state.user = {
        metamaskAccount: payload?.metamaskAddress,
        token: payload?.token,
        refreshToken: payload?.refreshToken,
      };
      const newUserObject = {
        ...JSON.parse(window.localStorage.getItem('user')),
        token: payload?.token,
        refreshToken: payload?.refreshToken,
      };
      window.localStorage.setItem('user', JSON.stringify(newUserObject));
    });
    builder.addCase(onRefreshToken.rejected, (state) => {
      state.authLoading = false;
      state.authError = true;
      state.user = null;
      window.localStorage.removeItem('user');
    });
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
