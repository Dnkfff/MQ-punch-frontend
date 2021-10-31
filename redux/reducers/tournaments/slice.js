import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'global-manager',
  initialState: {
    filter_menu_is_open: false,
  },
  reducers: {
    changeFilterMenuOpenedState: (state, action) => {
      const newValue = action.payload;

      state.filter_menu_is_open = newValue;
    },
    setUpdatedFilteringForm: (state, action) => {
      const { updatedFilteringForm, page } = action.payload;

      state[page] = updatedFilteringForm;
    },
  },
});

export const { changeFilterMenuOpenedState, setUpdatedFilteringForm } = slice.actions;

export default slice.reducer;
