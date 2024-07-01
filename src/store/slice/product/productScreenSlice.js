import { createSlice } from "@reduxjs/toolkit";
import { getSelectedProduct } from "../../../services/product/product";

const initialState = {
  selectedProduct: {
    data: [],
  },
};

export const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSelectedProduct.fulfilled, (state, { payload }) => {
      state.selectedProduct.data = payload;
    });
  },
});

// export const { data } = selectedProductSlice.actions;
export default selectedProductSlice.reducer;
