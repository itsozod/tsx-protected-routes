import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice/userSlice";
import { todosApi } from "./api/api";
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});
