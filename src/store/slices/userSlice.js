import { createSlice } from "@reduxjs/toolkit";

const userToken = localStorage.getItem("jwt")
  ? localStorage.getItem("jwt")
  : null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    userToken: userToken,
  },
  reducers: {
    logOut(state, { payload }) {
      localStorage.removeItem("jwt");
      return {};
    },
  },
});

export const { logOut } = userSlice.actions;
export const userReducer = userSlice.reducer;
