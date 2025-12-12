import axios from "axios";
import { fetchKycStart, fetchingKycFailed, fetchKycSuccess, fetchFullKycSuccess } from "./kycSlice";

export const fetchKYC = () => async (dispatch) => {
  dispatch(fetchKycStart());
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No token Found. Please Login Again");
    }

    const res = await axios.get("http://localhost:3000/kyc/status", {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

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
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No token Found. Please Login Again");
    }

    const res = await axios.get("http://localhost:3000/kyc", {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch(fetchFullKycSuccess(res.data.userData));
    console.log(res.data.userData);
    } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Signup failed";
    console.log(error.message);
    dispatch(fetchingKycFailed(errorMessage));
  }
};
