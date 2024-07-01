import { createSlice } from "@reduxjs/toolkit";
import { getFoods } from "../../../services/restaurant/restaurant";

const initialState = {
  foods: {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
};

export const foodSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFoods.pending, (state) => {
        state.foods.isLoading = true;
      })
      .addCase(getFoods.fulfilled, (state, { payload }) => {
        state.foods.isLoading = false;
        state.foods.isSuccess = true;
        state.foods.data = payload;
      })
      .addCase(getFoods.rejected, (state, { payload }) => {
        state.foods.isLoading = false;
        state.foods.isSuccess = false;
        state.foods.errorMessage = payload;
      });
  },
});

export default foodSlice.reducer;
