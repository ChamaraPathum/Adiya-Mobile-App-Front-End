import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../AxiosOrders";

export const homecard = createAsyncThunk(
  "card/homecard",
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        `/liquors/allproducts`,
        page,
        {
          headers: { "Content-type": "application/json; charset=utf-8" },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
