import { createSlice, nanoid } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchType: { label: "posts", value: "posts" },
    input: "",
    skipSearch: true,
  },
  reducers: {
    changeSearchType(state, action) {
      return { ...state, searchType: action.payload };
    },
    changeSearchInput(state, action) {
      state.input = action.payload;
    },
    changeSkipSearch(state, action) {
      state.skipSearch = action.payload;
    },
  },
});

export const { changeSearchType, changeSearchInput, changeSkipSearch } =
  searchSlice.actions;
export const searchReducer = searchSlice.reducer;
