import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../AxiosOrders";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (page, { rejectWithValue }) => {
    try {
      const response = await instance.get("/user/authUser");
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

export const editProfile = createAsyncThunk(
  "editProfile/profileEdit",
  async ({ Data, id }, { rejectWithValue }) => {
    try {
      const { data } = await instance.put(`/user/userprofile/${id}`, Data, {
        headers: { "Content-type": "application/json; charset=utf-8" },
        body: JSON.stringify(Data),
      });
      return data;
    } catch (error) {
      console.log("fail---> " + error);
      return rejectWithValue(error.message);
    }
  }
);
