import axios from "axios";
import {
  fetchKycStart,
  fetchingKycFailed,
  fetchKycSuccess,
  fetchFullKycSuccess,
} from "./kycSlice";

export const fetchKYC = () => async (dispatch) => {
  dispatch(fetchKycStart());
  try {
    const res = await axios.get(
      "http://localhost:3000/kyc/status",
      { withCredentials: true }
    );

    dispatch(fetchKycSuccess(res.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Signup failed";
    console.log(error.message);
    dispatch(fetchingKycFailed(errorMessage));
  }
};

export const fetchFullKyc = () => async (dispatch) => {
  dispatch(fetchKycStart());
  try {
    const res = await axios.get(
      "http://localhost:3000/kyc",
      { withCredentials: true }
    );

    dispatch(fetchFullKycSuccess(res.data.userData));
    console.log(res.data.userData);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Signup failed";
    console.log(error.message);
    dispatch(fetchingKycFailed(errorMessage));
  }
};
