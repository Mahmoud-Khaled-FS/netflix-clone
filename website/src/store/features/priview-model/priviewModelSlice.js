import { createSlice } from '@reduxjs/toolkit';

const pMInit = {
  hasContent: false,
  content: {},
  position: {
    left: 0,
    top: 0,
  },
  isLodaing: false,
  inAnimation: false,
  id: '',
};

const priviewModel = createSlice({
  name: 'priviewModel',
  initialState: pMInit,
  reducers: {
    showPriviewModel: (state, action) => {
      state.position = action.payload.position;
      state.content = action.payload.content;
      state.hasContent = true;
      state.id = action.payload.id;
    },

    closePriviewModel: (state) => {
      return pMInit;
    },

    setMovieData: (state, action) => {},
  },
});
export const { showPriviewModel, closePriviewModel, animationEnded } = priviewModel.actions;
export default priviewModel.reducer;
