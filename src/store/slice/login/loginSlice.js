import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../../services/signIn/login";

const initialState = {
  signIn: {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
};

export const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.signIn.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.signIn.isLoading = false;
        state.signIn.isSuccess = true;
        state.signIn.data = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.signIn.isLoading = false;
        state.signIn.isSuccess = false;
        state.signIn.errorMessage = payload;
      });
  },
});

export default signInSlice.reducer;
