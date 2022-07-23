import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './features/auth/authenticationSlice';
import movieDataSlice from './features/movie/movieDataSlice';
import pagesStatesSlice from './features/pagesState/pagesStatesSlice';
import priviewModelSlice from './features/priview-model/priviewModelSlice';

export const store = configureStore({
  reducer: {
    priviewModel: priviewModelSlice,
    pagesState: pagesStatesSlice,
    auth: authenticationSlice,
    movies: movieDataSlice,
  },
});
