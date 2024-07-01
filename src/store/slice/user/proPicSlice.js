import { createSlice } from "@reduxjs/toolkit";
import { ProPic } from "../../../services/user/proPic";

const initialState = {
  proPic: {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
};

export const proPicSlice = createSlice({
  name: "editProPic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ProPic.pending, (state) => {
        state.proPic.isLoading = true;
      })
      .addCase(ProPic.fulfilled, (state, { payload }) => {
        state.proPic.isLoading = false;
        state.proPic.isSuccess = true;
        state.proPic.data = payload;
      })
      .addCase(ProPic.rejected, (state, { payload }) => {
        state.proPic.isLoading = false;
        state.proPic.isSuccess = false;
        state.proPic.errorMessage = payload;
        console.log("hii fail--->(proPicSLice file)");
      });
  },
});

export default proPicSlice.reducer;
