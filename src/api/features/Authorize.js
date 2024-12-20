import { createSlice } from "@reduxjs/toolkit";
import { ApiAuthorize } from "../services/ApiAuthorize";

const authSlice = createSlice({
  name: "otorisasi",
  initialState: {
    user: null,
    signIn: false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
      state.signIn = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.signIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      ApiAuthorize.endpoints.load.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        state.signIn = true;
      }
    );
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
