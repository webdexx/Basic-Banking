import axios from "axios";
import { postPersonalInfoStart, postPersonalInfoFailed, postPersonalInfoSuccess } from "./postPersonalInfoSlice";

export const postPersonalInfo = (personalDetails) => async (dispatch) => {
  dispatch(postPersonalInfoStart());
  try {
    const token = sessionStorage.getItem("token");

    if(!token) {
        throw new Error("No token Found. Please Login Again");
    }

    const res = await axios.post("http://localhost:3000/kyc/personal-details",
        personalDetails,
        {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
    );

    dispatch(postPersonalInfoSuccess(res.data));
    console.log(res.data);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "KYC Submission failed";
      console.log(error.message)
    dispatch(postPersonalInfoFailed(errorMessage));
  }
};