import axios from "axios";
import { postPersonalInfoStart, postPersonalInfoFailed, postPersonalInfoSuccess } from "./postPersonalInfoSlice";

export const postPersonalInfo = (personalDetails) => async (dispatch) => {
  dispatch(postPersonalInfoStart());
  try {
    const res = await axios.post("http://localhost:3000/kyc/personal-details",
        personalDetails,
        {withCredentials: true},
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