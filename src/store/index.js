import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import rootReducer from "../app/rootReducer";

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false, // Disable serializable state invariant middleware
});

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});
