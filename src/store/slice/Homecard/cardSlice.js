import { createSlice } from "@reduxjs/toolkit";
import { homecard } from "../../../services/HomeCard/card";

const initialState = {
  card: {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(homecard.pending, (state) => {
        state.card.isLoading = true;
      })
      .addCase(homecard.fulfilled, (state, { payload }) => {
        state.card.isLoading = false;
        state.card.isSuccess = true;
        state.card.data = payload;
      })
      .addCase(homecard.rejected, (state, { payload }) => {
        state.card.isLoading = false;
        state.card.isSuccess = false;
        state.card.errorMessage = payload;
      });
  },
});

export default cardSlice.reducer;
