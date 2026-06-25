import { createSlice } from "@reduxjs/toolkit";

import {
  clearSession,
  getStoredUser,
  getToken,
  persistSession,
} from "../../api/authStorage.js";
import { hotsdataApi } from "../hotsdata/hotsdataApi.js";

const initialState = {
  token: getToken(),
  user: getStoredUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      clearSession();
    },
    setCredentials(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      persistSession(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      hotsdataApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        persistSession(action.payload);
      },
    );
    builder.addMatcher(
      hotsdataApi.endpoints.register.matchFulfilled,
      (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        persistSession(action.payload);
      },
    );
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
