import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiCalls } from "./services/apiCalls";
import captionReducer from "./features/captionsSlice";
import descriptionsSlice from "./features/descriptionsSlice";
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [apiCalls.reducerPath]: apiCalls.reducer,
    captions: captionReducer,
    descriptions: descriptionsSlice,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiCalls.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
