import { createSlice, nanoid } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchType: { label: "posts", value: "posts" },
    input: "",
    skipSearch: true,
    page: 0,
    noMore: false,
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
    changeSearchPage(state, action) {
      state.page = action.payload;
    },
    changeNoMore(state, action) {
      state.noMore = action.payload;
    },
  },
});

export const {
  changeSearchType,
  changeSearchInput,
  changeSkipSearch,
  changeSearchPage,
  changeNoMore,
} = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
