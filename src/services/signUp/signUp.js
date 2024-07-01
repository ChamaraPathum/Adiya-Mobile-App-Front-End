import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../AxiosOrders";

export const signUp = createAsyncThunk(
  "signUp/signUp",
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(`/user/signup`, page, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
