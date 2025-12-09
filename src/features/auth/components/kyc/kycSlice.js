import { createSlice } from "@reduxjs/toolkit";
import { postPersonalInfoSuccess } from "./postPersonalInfoSlice";

const kycSlice = createSlice({
  name: "kyc",
  initialState: {
    loading: false,
    error: null,
    personalInfo: null,
    documents: null,
    overallStatus: null,
    loaded: false,
    userId: null
  },

  reducers: {
    fetchKycStart: (state) => {
      state.loading = true;
      state.error = null;
      state.loaded = false;
    },

    fetchKycSuccess: (state, action) => {
      const { userKycStatus, userId } = action.payload;
      state.loading = false;
      state.error = null;
      state.userId = userId;
      if(userKycStatus){
      state.personalInfo = userKycStatus.personalInfo;
      state.documents = userKycStatus.documents;
      state.overallStatus = userKycStatus.overallStatus;
      state.loaded = true;
      }
    },

    fetchingKycFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.loaded = true;
    },

    clearKycStatus: (state) => {
      state.loading = false;
      state.error = null;
    },
    clearKycOnLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.userId = null;
      state.personalInfo = null;
      state.documents = null;
      state.overallStatus = null;
      state.loaded = false;
  },
},

  extraReducers: (builder) => {
    builder.addCase(postPersonalInfoSuccess, (state, action) => {
  const { kycStatus } = action.payload || {};

  if (kycStatus) {
    state.personalInfo = kycStatus.personalInfo;
    state.documents = kycStatus.documents;
    state.overallStatus = kycStatus.overallStatus;
  }});
  },
});

export const {
  fetchKycStart,
  fetchKycSuccess,
  fetchingKycFailed,
  clearKycStatus,
  clearKycOnLogout
} = kycSlice.actions;

export default kycSlice.reducer;
