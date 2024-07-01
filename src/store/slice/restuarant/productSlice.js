import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../../../services/restaurant/restaurant";

const initialState = {
  products: {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.products.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.products.isLoading = false;
        state.products.isSuccess = true;
        state.products.data = payload;
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.products.isLoading = false;
        state.products.isSuccess = false;
        state.products.errorMessage = payload;
      });
  },
});

export default productSlice.reducer;
