import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../../services/user/user";

const initialState = {
  user: {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
};

export const getUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.user.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.user.isLoading = false;
        state.user.isSuccess = true;
        state.user.data = payload;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.user.isLoading = false;
        state.user.isSuccess = false;
        state.user.errorMessage = payload;
        console.log("hii fail--->(getUserSlice file)");
      });
  },
});

export default getUserSlice.reducer;
