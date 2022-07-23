import { createSlice } from '@reduxjs/toolkit';

const moviesInit = {
  movies: [],
};

const moviesModel = createSlice({
  name: 'priviewModel',
  initialState: moviesInit,
  reducers: {
    addMovie: (state, action) => {
      state.movies.push(action.payload);
    },
  },
});
export const { addMovie } = moviesModel.actions;
export default moviesModel.reducer;
