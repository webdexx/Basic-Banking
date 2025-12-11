import { createSlice } from "@reduxjs/toolkit";

const registerUserSlice = createSlice({
  name: "registerUser",
  initialState: {
    firstName: "",
    error: null,
    isSuccess: false,
    isLoading: false,
  },

  reducers: {
    signupConnect: (state) => {
      state.isLoading = true;
      state.error = null;
      state.isSuccess = false;
    },
    signupSuccess: (state, action) => {
      const { user } = action.payload;
      state.firstName = user?.firstName || "";
      state.isSuccess = true;
      state.error = null;
      state.isLoading = false;
    },
    signupFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSuccess = false;
    },

    clearError: (state) => {
      state.error = null;
    },
    resetRegisterState: (state) => {
      state.firstName = "";
      state.error = null;
      state.isSuccess = false;
      state.isLoading = false;
    },
  },
});

export const { signupConnect, signupFailed, signupSuccess, clearError, resetRegisterState } =
  registerUserSlice.actions;
export default registerUserSlice.reducer;
