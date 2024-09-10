import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: localStorage.getItem("token") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.accessToken = payload;
      localStorage.setItem("token", JSON.stringify(state.accessToken));
    },
    setRefresh: (state, { payload }) => {
      state.refreshToken = payload;
      localStorage.setItem("refreshToken", JSON.stringify(state.refreshToken));
    },
    removeToken: (state, { payload }) => {
      state.accessToken = payload;
      localStorage.removeItem("token");
    },
    loggedOut: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setToken, removeToken, loggedOut, setRefresh } =
  authSlice.actions;
