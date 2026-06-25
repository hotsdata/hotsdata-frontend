import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice.js";
import { hotsdataApi } from "../features/hotsdata/hotsdataApi.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [hotsdataApi.reducerPath]: hotsdataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hotsdataApi.middleware),
});
