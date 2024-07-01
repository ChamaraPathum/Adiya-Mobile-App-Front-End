import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../AxiosOrders";

export const ProPic = createAsyncThunk(
  "proPic/proPic",

  async ({ Data, id }, { rejectWithValue }) => {
    try {
      const { data } = await instance.put(`/user/userprofile/${id}`, Data, {
        headers: {
          "Content-Type": "multipart/form-data",
          body: ProPic,
        },
      });
      return data;
    } catch (error) {
      console.log("fail---", error);
      return rejectWithValue(error.message);
    }
  }
);
