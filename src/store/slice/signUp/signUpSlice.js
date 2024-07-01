import { createSlice } from "@reduxjs/toolkit";
import { signUp } from "../../../services/signUp/signUp";

const initialState = {
  signUp: {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.signUp.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.signUp.isLoading = false;
        state.signUp.isSuccess = true;
        state.signUp.data = payload;
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.signUp.isLoading = false;
        state.signUp.isSuccess = false;
        state.signUp.errorMessage = payload;
        console.log("hii fail---(signUpSlice file)");
      });
  },
});

export default signUpSlice.reducer;
