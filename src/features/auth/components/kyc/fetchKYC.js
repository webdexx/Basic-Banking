import axios from "axios";
import { fetchKycStart, fetchingKycFailed, fetchKycSuccess } from "./kycSlice";

export const fetchKYC = () => async (dispatch) => {
  dispatch(fetchKycStart());
  try {
    const token = sessionStorage.getItem("token");

    if(!token) {
        throw new Error("No token Found. Please Login Again");
    }

    const res = await axios.get("http://localhost:3000/kyc/status", 
        {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
    );

    dispatch(fetchKycSuccess(res.data));
    console.log(res.data);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Signup failed";
      console.log(error.message)
    dispatch(fetchingKycFailed(errorMessage));
  }
};