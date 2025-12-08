import axios from "axios";
import { loginSuccess, loginFailed, loginStart } from "./authSlice";

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
  const res = await axios.post("http://localhost:3000/auth/login", { email, password });
  dispatch(loginSuccess(res.data));

  } catch(error) {
    const errorMessage = error.response?.data?.message || error.message || 'Login failed';
    dispatch(loginFailed(errorMessage));
  }
};