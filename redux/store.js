import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { GlobalManager } from './reducers';

export default configureStore({
  reducer: {
    global_manager: GlobalManager,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
