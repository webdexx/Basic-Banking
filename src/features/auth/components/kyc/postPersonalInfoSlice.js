import { createSlice } from "@reduxjs/toolkit";

const postPersonalInfoSlice = createSlice({
  name: "postPersonalInfo",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    postPersonalInfoStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },

    
    postPersonalInfoSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },

    postPersonalInfoFailed: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload || "Failed to submit personal info";
    },

    clearPostPersonalInfoStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  postPersonalInfoStart,
  postPersonalInfoSuccess,
  postPersonalInfoFailed,
  clearPostPersonalInfoStatus,
} = postPersonalInfoSlice.actions;

export default postPersonalInfoSlice.reducer;
