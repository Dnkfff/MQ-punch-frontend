import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { globalManager, Auth, Tournaments } from './reducers';

export default configureStore({
  reducer: {
    global_manager: globalManager,
    auth: Auth,
    tournaments: Tournaments,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
