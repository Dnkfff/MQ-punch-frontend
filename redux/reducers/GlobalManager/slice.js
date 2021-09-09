import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'global-manager',
  initialState: {
    header_height: 0,
    mobile_menu_is_opened: false,
    user: false,
  },
  reducers: {
    changeHeaderHeight: (state, action) => {
      const newHeaderHeight = action.payload;

      state.header_height = newHeaderHeight;
    },
    changeMobileMenuOpened: (state, action) => {
      const newMobileMenuOpenedState = action.payload;

      state.mobile_menu_is_opened = newMobileMenuOpenedState;
    },
  },
});

export const { changeHeaderHeight, changeMobileMenuOpened } = slice.actions;

export default slice.reducer;
