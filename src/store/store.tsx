import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice/userSlice";
import { todosApi } from "./api/api";
import { authSlice } from "./features/authAlice/authSlice";
import { api } from "./api/authApi";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    auth: authSlice.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware, api.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
