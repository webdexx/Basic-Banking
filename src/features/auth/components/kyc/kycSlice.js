import { createSlice } from "@reduxjs/toolkit";
import { postPersonalInfoSuccess } from "./postPersonalInfoSlice";

const kycSlice = createSlice({
  name: "kyc",
  initialState: {
    loading: false,
    error: null,
    personalInfo: "ACTIVE",
    documents: "DUE",
    overallStatus: "PENDING",
  },

  reducers: {
    fetchKycStart: (state) => {
      state.loading = true;
      state.error = null;
      state.personalInfo = "ACTIVE";
      state.documents = "DUE";
      state.overallStatus = "PENDING";
    },

    fetchKycSuccess: (state, action) => {
      const { personalInfo, documents, overallStatus } = action.payload;
      state.loading = false;
      state.error = null;
      state.personalInfo = personalInfo;
      state.documents = documents;
      state.overallStatus = overallStatus;
    },

    fetchingKycFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.personalInfo = "ACTIVE";
      state.documents = "DUE";
      state.overallStatus = "PENDING";
    },

    clearKycStatus: (state) => {
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(postPersonalInfoSuccess, (state, action) => {
      const payload = action.payload | {};
      const doc = payload?.personalInfo;

      if (doc?.kycStatus) {
        state.personalInfo = doc.kycStatus.personalInfo;
        state.documents = doc.kycStatus.documents;
        state.overallStatus = doc.kycStatus.overallStatus;
      }
    });
  },
});

export const {
  fetchKycStart,
  fetchKycSuccess,
  fetchingKycFailed,
  clearKycStatus,
} = kycSlice.actions;

export default kycSlice.reducer;
