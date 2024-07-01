import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../AxiosOrders";

export const login = createAsyncThunk(
  "login/postLogin",
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(`/user/login`, page, {
        headers: { "Content-type": "application/json; charset=utf-8" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
