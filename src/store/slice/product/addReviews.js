import { createSlice } from "@reduxjs/toolkit";
import { postReviews } from "../../../services/product/product";

const initialState = {
  Reviews: {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
};

export const postReviewsSlice = createSlice({
  name: "postReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postReviews.pending, (state) => {
        state.Reviews.isLoading = true;
      })
      .addCase(postReviews.fulfilled, (state, { payload }) => {
        state.Reviews.isLoading = false;
        state.Reviews.isSuccess = true;
        state.Reviews.data = payload;
      })
      .addCase(postReviews.rejected, (state, { payload }) => {
        state.Reviews.isLoading = false;
        state.Reviews.isSuccess = false;
        state.Reviews.errorMessage = payload;
      });
  },
});

export default postReviewsSlice.reducer;
