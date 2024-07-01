import { createSlice } from "@reduxjs/toolkit";
import { deleteReview } from "../../../services/product/product";

const initialState = {
  reviewDelete: {
    data: null,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
};

export const deleteReviewSlice = createSlice({
  name: "reviewDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteReview.pending, (state) => {
        state.reviewDelete.isLoading = true;
      })
      .addCase(deleteReview.fulfilled, (state, { payload }) => {
        state.reviewDelete.isLoading = false;
        state.reviewDelete.isSuccess = true;
        state.reviewDelete.data = payload.data;
      })
      .addCase(deleteReview.rejected, (state, { payload }) => {
        state.reviewDelete.isLoading = false;
        state.reviewDelete.isSuccess = false;
        state.reviewDelete.errorMessage = payload;
      });
  },
});

export default deleteReviewSlice.reducer;
