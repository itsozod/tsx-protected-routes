import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice/userSlice";
import { todosApi } from "./api/api";
import { authSlice } from "./features/authAlice/authSlice";
import { authApi } from "./api/authApi";
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    auth: authSlice.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware, authApi.middleware),
});
