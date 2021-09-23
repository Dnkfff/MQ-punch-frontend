import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { globalManager, Auth } from './reducers';

export default configureStore({
  reducer: {
    global_manager: globalManager,
    auth: Auth,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
