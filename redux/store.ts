import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

import { globalManager, Auth, Tournaments, Profile } from './reducers';

const store = configureStore({
  reducer: {
    global_manager: globalManager,
    auth: Auth,
    tournaments: Tournaments,
    profile: Profile,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

type RootState = ReturnType<typeof store.getState>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
