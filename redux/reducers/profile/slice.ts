import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import User from '../../../api/user/user';
import { onLogOut, setAuthLoading } from '../auth/slice';
import { toast } from '../../../containers/TooltipsProvider/TooltipsProvider';

interface IUpdateUserProfile {
  email: string;
  discord: string;
  username: string;
}

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
    const profileResult = await User.getProfile({ userId: null });
    thunkAPI.dispatch(setAuthLoading(false));
    if (!profileResult || !profileResult.data || !profileResult.data.me) {
      thunkAPI.dispatch(onLogOut());
      return null;
    }
    window.localStorage.setItem('profile_user', JSON.stringify(profileResult.data.me.user));
    window.localStorage.setItem('avgRating', JSON.stringify(profileResult.data.me.avgRating));
    window.localStorage.setItem('earnings', JSON.stringify(profileResult.data.me.earnings));
    window.localStorage.setItem('winrate', JSON.stringify(profileResult.data.me.winrate));
    window.localStorage.setItem('last_user_update', Date.now().toString());
    thunkAPI.dispatch(getUserBoxers());

    return profileResult.data?.me;
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(setAuthLoading(false));
    thunkAPI.dispatch(onLogOut());
  }
});

export const updateUserProfile = createAsyncThunk<
  IUpdateUserProfile,
  IUpdateUserProfile,
  { rejectValue: any }
>('profile/update-profile', async ({ username, email, discord }, thunkAPI) => {
  thunkAPI.dispatch(setAuthLoading(true));

  try {
    await User.saveUserProfile({ username, email, discord });
    thunkAPI.dispatch(setAuthLoading(false));

    let newProfileUser = JSON.parse(window.localStorage.getItem('profile_user'));
    newProfileUser.username = username;
    newProfileUser.email = email;
    newProfileUser.discord = discord;
    window.localStorage.setItem('profile_user', JSON.stringify(newProfileUser));

    return { username, email, discord };
  } catch (error) {
    console.log(error);
    toast.errorMessage('Error while saving new profile information');
    thunkAPI.dispatch(setAuthLoading(false));
  }
});

export const getUserBoxers = createAsyncThunk('profile/get-boxers', async (_, thunkAPI) => {
  thunkAPI.dispatch(setAuthLoading(true));

  try {
    const userId = JSON.parse(window.localStorage.getItem('profile_user')).id;
    const boxersResult = await User.getBoxersInWallet({ userId });
    thunkAPI.dispatch(setAuthLoading(false));

    if (!boxersResult || !boxersResult.data || !boxersResult.data.boxers) {
      return [];
    }
    return boxersResult.data.boxers;
  } catch (error) {
    console.log(error);
    toast.errorMessage('Server error while trying to get boxers');
    thunkAPI.dispatch(setAuthLoading(false));
  }
});

export const getAnotherUserProfileInfo = createAsyncThunk<any, any, { rejectValue: any }>(
  'profile/get-another-user-profile',
  async ({ userId }, thunkAPI) => {
    thunkAPI.dispatch(setAuthLoading(true));

    try {
      const profileResult = await User.getProfile({ userId });
      const boxersResult = await User.getBoxersInWallet({ userId });
      thunkAPI.dispatch(setAuthLoading(false));

      return { profile: profileResult?.data?.me || null, boxers: boxersResult?.data?.boxers || [] };
    } catch (error) {
      console.log(error);
      toast.errorMessage('Server error while trying to get profile');
      thunkAPI.dispatch(setAuthLoading(false));
      return { profile: null, boxers: [] };
    }
  }
);

export const slice = createSlice({
  name: 'profile',
  initialState: {
    edit_mode: false,
    user: null,
    avgRating: null,
    earnings: null,
    winrate: null,
    boxers: null,
    another_user_profile: null,
    another_user_avgRating: null,
    another_user_earnings: null,
    another_user_winrate: null,
    another_user_boxers: null,
  },
  extraReducers: (builder) => {
    // get profile
    builder.addCase(getUserProfile.pending, (state) => {
      state.edit_mode = false;
    });
    builder.addCase(getUserProfile.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload.user;
        state.avgRating = payload.avgRating;
        state.earnings = payload.earnings;
        state.winrate = payload.winrate;
      }
    });
    builder.addCase(getUserProfile.rejected, (state) => {
      state.user = null;
    });
    // update profile
    builder.addCase(updateUserProfile.fulfilled, (state, { payload }) => {
      if (payload) {
        state.edit_mode = false;
        state.user = {
          ...state.user,
          username: payload.username,
          email: payload.email,
          discord: payload.discord,
        };
      }
    });
    // get boxers
    builder.addCase(getUserBoxers.fulfilled, (state, { payload }) => {
      window.localStorage.setItem('profile-boxers', JSON.stringify(payload));
      state.boxers = payload;
    });
    // get another user
    builder.addCase(getAnotherUserProfileInfo.pending, (state) => {
      state.edit_mode = false;
      state.another_user_boxers = null;
      state.another_user_profile = null;
    });
    builder.addCase(getAnotherUserProfileInfo.fulfilled, (state, { payload }) => {
      state.another_user_boxers = payload.boxers;
      if (payload.profile) {
        state.another_user_profile = payload.profile.user;
        state.another_user_avgRating = payload.profile.avgRating;
        state.another_user_earnings = payload.profile.earnings;
        state.another_user_winrate = payload.profile.winrate;
      }
    });
  },
  reducers: {
    setEditMode: (state, action) => {
      state.edit_mode = action.payload;
    },
    resetProfileUser: (state) => {
      state.user = JSON.parse(window.localStorage.getItem('profile_user'));
      state.avgRating = JSON.parse(window.localStorage.getItem('avgRating'));
      state.earnings = JSON.parse(window.localStorage.getItem('earnings'));
      state.winrate = JSON.parse(window.localStorage.getItem('winrate'));
      state.boxers = JSON.parse(window.localStorage.getItem('profile-boxers'));
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
