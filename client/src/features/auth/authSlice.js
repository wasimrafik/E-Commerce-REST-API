import { createSlice } from "@reduxjs/toolkit";
import { createUserAsync, getLoginUserAsync } from "./authAPI";

const initialState = {
  status: false,
  user: {},
  isLoading: false,
  success: null,
  error: null,
};


export const LoginPages = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = true;
        state.user = action.payload;
      })
      .addCase(getLoginUserAsync.pending, (state) => {
        state.status = false;
        state.isLoading = true;
      })
      .addCase(getLoginUserAsync.fulfilled, (state, action) => {
        state.status = true;
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(getLoginUserAsync.rejected, (state, action) => {
        state.status = false;
        state.error = action.error;
        state.isLoading = false;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.user;
export const selectError = (state) => state.auth.error;
// export const { increment } = LoginPage.actions;

export default LoginPages.reducer;
