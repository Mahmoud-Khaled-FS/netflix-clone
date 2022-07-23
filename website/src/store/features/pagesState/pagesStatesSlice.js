import { createSlice } from '@reduxjs/toolkit';

const pageInit = {
  scrollPosition: 0,
  genreOpen: false,
  genresData: [],
};

const pagesState = createSlice({
  name: 'pagesState',
  initialState: pageInit,
  reducers: {
    setScroll: (state, action) => {
      state.scrollPosition = action.payload;
    },
    genreState: (state, action) => {
      state.genreOpen = action.payload;
    },
    setGenresData: (state, action) => {
      state.genresData = action.payload;
    },
  },
});
export const { setScroll, genreState, setGenresData } = pagesState.actions;
export default pagesState.reducer;
