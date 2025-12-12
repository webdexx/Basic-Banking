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
    userId: null,
    userFullName: null,
    userEmail: null,
    userMobile: null,
    userStatus: null,
    userPermanentAddress: null,
    userCorrespondenceAddress: null,
    userGender: null,
    userDOB: null,
    userPAN: null,
    userAadhar: null,
    userOccupation: null,
    userMonthlyIncome: null,
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
      if (userKycStatus) {
        state.personalInfo = userKycStatus.personalInfo;
        state.documents = userKycStatus.documents;
        state.overallStatus = userKycStatus.overallStatus;
        state.loaded = true;
      }
    },

    fetchFullKycSuccess: (state, action) => {
      const {
        userFullname,
        userEmail,
        userMobile,
        userStatus,
        userPermanentAddress,
        userCorrespondenceAddress,
        userPAN,
        userAadhar,
        userDOB,
        userGender,
        userOccupation,
        userMonthlyIncome,
      } = action.payload;
      state.userFullName = userFullname;
      state.userEmail = userEmail;
      state.userMobile = userMobile;
      state.userStatus = userStatus;
      state.userPermanentAddress = userPermanentAddress;
      state.userCorrespondenceAddress = userCorrespondenceAddress;
      state.userGender = userGender;
      state.userDOB = userDOB;
      state.userPAN = userPAN;
      state.userAadhar = userAadhar;
      state.userOccupation = userOccupation;
      state.userMonthlyIncome = userMonthlyIncome;
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
      }
    });
  },
});

export const {
  fetchKycStart,
  fetchKycSuccess,
  fetchFullKycSuccess,
  fetchingKycFailed,
  clearKycStatus,
  clearKycOnLogout,
} = kycSlice.actions;

export default kycSlice.reducer;
