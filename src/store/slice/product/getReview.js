import { createSlice } from "@reduxjs/toolkit";
import { getProductReviews } from "../../../services/product/product";

const initialState = {
  productReviews: {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
};

export const getReviewsSlice = createSlice({
  name: "getReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductReviews.pending, (state) => {
        state.productReviews.isLoading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, { payload }) => {
        state.productReviews.isLoading = false;
        state.productReviews.isSuccess = true;
        state.productReviews.data = payload;
      })
      .addCase(getProductReviews.rejected, (state, { payload }) => {
        state.productReviews.isLoading = false;
        state.productReviews.isSuccess = false;
        state.productReviews.errorMessage = payload;
      });
  },
});

export default getReviewsSlice.reducer;
