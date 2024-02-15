import { createSlice } from "@reduxjs/toolkit";
import { IsAuth } from "../../../types/Types";

const initialState: IsAuth = {
  isAuth: localStorage.getItem("auth") || false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.isAuth = payload;
      localStorage.setItem("auth", JSON.stringify(state.isAuth));
    },
    logOutUser: (state, { payload }) => {
      state.isAuth = payload;
      localStorage.removeItem("auth");
    },
  },
});

export const { setUser, logOutUser } = userSlice.actions;
