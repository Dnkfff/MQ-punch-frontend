import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'profile',
  initialState: {
    edit_mode: false,
  },
  reducers: {
    setEditMode: (state, action) => {
      state.edit_mode = action.payload;
    },
  },
});

export const { setEditMode } = slice.actions;

export default slice.reducer;
