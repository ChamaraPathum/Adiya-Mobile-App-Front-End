import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../../../services/product/product";

const initialState = {
  allproducts: {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
};

export const allProductSlice = createSlice({
  name: "allproducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.allproducts.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.allproducts.isLoading = false;
        state.allproducts.isSuccess = true;
        state.allproducts.data = payload;
      })
      .addCase(getAllProducts.rejected, (state, { payload }) => {
        state.allproducts.isLoading = false;
        state.allproducts.isSuccess = false;
        state.allproducts.errorMessage = payload;
      });
  },
});

export default allProductSlice.reducer;
