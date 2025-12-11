import { clearKycOnLogout } from "../kyc/kycSlice";
import { onLogout } from "./authSlice";
import { clearPostPersonalInfoStatus } from "../kyc/postPersonalInfoSlice";
import { resetRegisterState } from "../Register/registerSlice";

export const logoutUser = () => (dispatch) => {
  sessionStorage.removeItem("token");
  dispatch(onLogout());
  dispatch(clearKycOnLogout());
  dispatch(clearPostPersonalInfoStatus());
  dispatch(resetRegisterState());
  sessionStorage.clear();
  localStorage.clear();
  console.clear();
};