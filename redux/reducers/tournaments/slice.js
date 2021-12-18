import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'global-manager',
  initialState: {
    filter_menu_is_open: false,
    live_events: null,
    live_events_loading: false,
    events_loading: false,
    events_pagination_loading: false,
  },
  reducers: {
    changeFilterMenuOpenedState: (state, action) => {
      const newValue = action.payload;

      state.filter_menu_is_open = newValue;
    },
    setLiveEvents: (state, action) => {
      state.live_events = action.payload;
    },
    setLiveEventsLoading: (state, action) => {
      state.live_events_loading = action.payload;
    },
    setEventsLoading: (state, action) => {
      state.events_loading = action.payload;
    },
    setEventsPaginationLoading: (state, action) => {
      state.events_pagination_loading = action.payload;
    },
    setUpdatedFilteringForm: (state, action) => {
      const { updatedFilteringForm, page } = action.payload;

      state[page] = {};
      state[page].form = updatedFilteringForm;
    },
    setPageSearchResult: (state, action) => {
      const { searchResult, metaData, page } = action.payload;

      if (!state[page]) {
        state[page] = {};
      }

      state[page].searchResult = searchResult;
      state[page].metaData = metaData;
    },
  },
});

export const {
  changeFilterMenuOpenedState,
  setLiveEvents,
  setLiveEventsLoading,
  setEventsLoading,
  setEventsPaginationLoading,
  setUpdatedFilteringForm,
  setPageSearchResult,
} = slice.actions;

export default slice.reducer;
