import { createSlice } from "@reduxjs/toolkit";
import { editProfile } from "../../../services/user/user";

const initialState = {
  editUser: {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
};

export const editProfileSlice = createSlice({
  name: "editUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editProfile.pending, (state) => {
        state.editUser.isLoading = true;
      })
      .addCase(editProfile.fulfilled, (state, { payload }) => {
        state.editUser.isLoading = false;
        state.editUser.isSuccess = true;
        state.editUser.data = payload;
      })
      .addCase(editProfile.rejected, (state, { payload }) => {
        state.editUser.isLoading = false;
        state.editUser.isSuccess = false;
        state.editUser.errorMessage = payload;
        console.log("hii fail--->(in editProfileSlice)");
      });
  },
});

export default editProfileSlice.reducer;
