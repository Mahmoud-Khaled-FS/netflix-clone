import { createSlice } from '@reduxjs/toolkit';

const dataLocal = window.localStorage.getItem('auth');
const datasession = window.sessionStorage.getItem('userId');
// console.log(datasession);

const data = JSON.parse(dataLocal);
const dataUser = JSON.parse(datasession);

const authInit = {
  token: data ? data.token : null,
  userId: dataUser ? dataUser : null,
  accountId: data ? data.accountId : null,
  email: data ? data.email : null,
  setup: true,
  users: [],
};

const authState = createSlice({
  name: 'authState',
  initialState: authInit,
  reducers: {
    setAuthentication: (state, action) => {
      state.token = action.payload.token;
      state.accountId = action.payload.accountId;
      state.email = action.payload.email;
    },
    finishSetup: (state) => {
      state.setup = true;
    },
    startSetup: (state) => {
      state.setup = false;
    },
    setUser: (state, action) => {
      state.userId = action.payload;
    },
    setAllUsers: (state, action) => {
      state.users = action.payload;
    },
    logout: (state, action) => {
      state.token = null;
      state.email = null;
      state.userId = null;
      state.setup = true;
      state.users = [];
    },
  },
});
export const { setAuthentication, finishSetup, setUser, startSetup, setAllUsers, logout } = authState.actions;
export default authState.reducer;
