import { createSlice, nanoid } from "@reduxjs/toolkit";

const searchTypeSlice = createSlice({
  name: "searchType",
  initialState: {
    label: "posts",
    value: "posts",
  },
  reducers: {
    changeSearchType(state, action) {
      return action.payload;
    },
  },
});

export const { changeSearchType } = searchTypeSlice.actions;
export const searchTypeReducer = searchTypeSlice.reducer;
