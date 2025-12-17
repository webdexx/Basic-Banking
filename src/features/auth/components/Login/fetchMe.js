import axios from "axios";
import { onLogout, onPageRefresh } from "./authSlice";
import { fetchKYC } from "../kyc/fetchKYC";

export const fetchMe = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "http://localhost:3000/auth/me",
      { withCredentials: true }
    );
    dispatch(onPageRefresh({
    flag: res.data.user.flag
    }));
    console.log(res.data);
    dispatch(fetchKYC());
  } catch (error) {
    dispatch(onLogout());
    const errorMessage =
      error.response?.data?.message || error.message || "Login failed";
    console.log(errorMessage);
  }
};
