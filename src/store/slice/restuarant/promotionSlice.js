import { createSlice } from "@reduxjs/toolkit";
import { getPromotion } from "../../../services/restaurant/restaurant";

const initialState = {
  promotion: {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
};

export const promotionSlice = createSlice({
  name: "promotion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPromotion.pending, (state) => {
        state.promotion.isLoading = true;
      })
      .addCase(getPromotion.fulfilled, (state, { payload }) => {
        state.promotion.isLoading = false;
        state.promotion.isSuccess = true;
        state.promotion.data = payload;
      })
      .addCase(getPromotion.rejected, (state, { payload }) => {
        state.promotion.isLoading = false;
        state.promotion.isSuccess = false;
        state.promotion.errorMessage = payload;
      });
  },
});

export default promotionSlice.reducer;
