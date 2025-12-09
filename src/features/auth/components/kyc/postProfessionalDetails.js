import axios from "axios";
import { postProfessionalInfoStart, postProfessionalInfoFailed, postProfessionalInfoSuccess } from "./postProfessionalInfoSlice";

export const postProfessionalInfo = (ProfessionalDetails) => async (dispatch) => {
  dispatch(postProfessionalInfoStart());
  try {
    const token = sessionStorage.getItem("token");

    if(!token) {
        throw new Error("No token Found. Please Login Again");
    }

    const res = await axios.post("http://localhost:3000/kyc/professional-details",
        ProfessionalDetails,
        {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
    );

    dispatch(postProfessionalInfoSuccess(res.data));
    console.log(res.data);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "KYC Submission failed";
      console.log(error.message)
    dispatch(postProfessionalInfoFailed(errorMessage));
  }
};