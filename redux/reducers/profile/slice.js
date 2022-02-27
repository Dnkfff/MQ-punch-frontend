import { axiosAuth } from '../../../api/index';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { onLogOut, setAuthLoading } from '../auth/slice';

import { SERVER_URL } from '../../../inside-services/constants/constants';

export const getUserProfile = createAsyncThunk('profile/get-profile', async (_, thunkAPI) => {
  const url = `${SERVER_URL}/user/me`;

  thunkAPI.dispatch(setAuthLoading(true));

  try {
    const profileResult = await axiosAuth.get(url);
    thunkAPI.dispatch(setAuthLoading(false));
    return profileResult;
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
    console.log(payload);
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
    profile: null,
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
  },
});

export const { setEditMode } = slice.actions;

export default slice.reducer;
