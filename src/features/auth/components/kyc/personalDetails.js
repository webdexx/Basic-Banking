import axios from "axios";
import { signupConnect, signupSuccess, signupFailed } from "./registerSlice";

export const signupUser = (userData) => async (dispatch) => {
  dispatch(signupConnect());
  try {
    const res = await axios.post("http://localhost:3000/register", userData);
    dispatch(signupSuccess(res.data));
    console.log(res.data);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Signup failed";
    dispatch(signupFailed(errorMessage));
  }
};