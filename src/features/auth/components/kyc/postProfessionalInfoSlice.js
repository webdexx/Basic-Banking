import { createSlice } from "@reduxjs/toolkit";

const postProfessionalInfoSlice = createSlice({
  name: "postProfessionalInfo",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    postProfessionalInfoStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },

    
    postProfessionalInfoSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
},

    postProfessionalInfoFailed: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload || "Failed to submit Professional info";
    },

    clearPostProfessionalInfoStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.professionalInfo = null;
      state.kycStatus = null;
    },
  },
});

export const {
  postProfessionalInfoStart,
  postProfessionalInfoSuccess,
  postProfessionalInfoFailed,
  clearPostProfessionalInfoStatus,
} = postProfessionalInfoSlice.actions;

export default postProfessionalInfoSlice.reducer;
