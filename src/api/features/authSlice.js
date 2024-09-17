import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../service/authApi";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.load.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
      }
    );
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
