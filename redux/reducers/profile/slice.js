import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import User from '../../../api/user/user';
import { onLogOut, setAuthLoading } from '../auth/slice';

export const localStorageClearProfile = () => {
  window.localStorage.removeItem('profile_user');
  window.localStorage.removeItem('avgRating');
  window.localStorage.removeItem('earnings');
  window.localStorage.removeItem('winrate');
  window.localStorage.removeItem('last_user_update');
};

export const getUserProfile = createAsyncThunk('profile/get-profile', async (_, thunkAPI) => {
  thunkAPI.dispatch(setAuthLoading(true));

  try {
    const profileResult = await User.getProfile();
    thunkAPI.dispatch(setAuthLoading(false));
    if (!profileResult || !profileResult.data || !profileResult.data.me) {
      thunkAPI.dispatch(onLogOut());
      return null;
    }
    return profileResult.data?.me;
  } catch (error) {
    thunkAPI.dispatch(setAuthLoading(false));
    thunkAPI.dispatch(onLogOut());
  }
});

const getUserProfileExtraReducer = {
  [getUserProfile.pending]: (state) => {
    state.profileLoading = true;
    state.edit_mode = false;
  },
  [getUserProfile.fulfilled]: (state, { payload }) => {
    if (payload) {
      state.user = payload.user;
      state.avgRating = payload.avgRating;
      state.earnings = payload.earnings;
      state.winrate = payload.winrate;
      window.localStorage.setItem('profile_user', JSON.stringify(payload.user));
      window.localStorage.setItem('avgRating', JSON.stringify(payload.avgRating));
      window.localStorage.setItem('earnings', JSON.stringify(payload.earnings));
      window.localStorage.setItem('winrate', JSON.stringify(payload.winrate));
      window.localStorage.setItem('last_user_update', Date.now());
    }
    state.profileLoading = false;
  },
  [getUserProfile.rejected]: (state) => {
    state.profileLoading = false;
    state.profile = null;
  },
};

export const slice = createSlice({
  name: 'profile',
  initialState: {
    edit_mode: false,
    user: null,
    avgRating: null,
    earnings: null,
    winrate: null,
    boxers: null,
    profileLoading: false,
  },
  extraReducers: {
    // get profile
    ...getUserProfileExtraReducer,
  },
  reducers: {
    setEditMode: (state, action) => {
      state.edit_mode = action.payload;
    },
    resetProfileUser: (state, action) => {
      state.user = action.payload;
    },
    resetEarnings: (state, action) => {
      state.earnings = action.payload;
    },
    resetAvgRating: (state, action) => {
      state.avgRating = action.payload;
    },
    resetBoxers: (state, action) => {
      state.boxers = action.payload;
    },
  },
});

export const { setEditMode, resetProfileUser, resetEarnings, resetAvgRating, resetBoxers } =
  slice.actions;

export default slice.reducer;
