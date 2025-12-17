import { clearKycOnLogout } from "../kyc/kycSlice";
import { onLogout } from "./authSlice";
import { clearPostPersonalInfoStatus } from "../kyc/postPersonalInfoSlice";
import { resetRegisterState } from "../Register/registerSlice";
import axios from "axios";

export const logoutUser = () => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/auth/logout",
      {},
      { withCredentials: true }
    );
    console.log(res.data);
  } catch {
    console.log("Error logging out");
  } finally {
    dispatch(onLogout());
    dispatch(clearKycOnLogout());
    dispatch(clearPostPersonalInfoStatus());
    dispatch(resetRegisterState());
    sessionStorage.clear();
    localStorage.clear();
  }
};
