import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'global-manager',
  initialState: {
    header_height: 0,
    mobile_menu_is_opened: false,
    global_modal_data: null,
    screen_width: null,
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
    setGlobalModalData: (state, action) => {
      const newGlobalModalData = action.payload;

      state.global_modal_data = newGlobalModalData;
    },
    setScreenWidth: (state, action) => {
      const newScreenWidth = action.payload;

      state.screen_width = newScreenWidth;
    },
  },
});

export const { changeHeaderHeight, changeMobileMenuOpened, setGlobalModalData, setScreenWidth } =
  slice.actions;

export default slice.reducer;
