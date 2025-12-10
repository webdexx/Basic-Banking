import { clearKycOnLogout } from "../kyc/kycSlice";
import { onLogout } from "./authSlice";
import { clearPostPersonalInfoStatus } from "../kyc/postPersonalInfoSlice";

export const logoutUser = () => (dispatch) => {
  sessionStorage.removeItem("token");
  dispatch(onLogout());
  dispatch(clearKycOnLogout());
  dispatch(clearPostPersonalInfoStatus());
  sessionStorage.clear();
  localStorage.clear();
};