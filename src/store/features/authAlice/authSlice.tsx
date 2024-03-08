import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: localStorage.getItem("token") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.accessToken = payload;
      localStorage.setItem("token", JSON.stringify(state.accessToken));
    },
    removeToken: (state, { payload }) => {
      state.accessToken = payload;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
