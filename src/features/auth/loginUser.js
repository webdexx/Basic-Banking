import axios from "axios";
import { loginSuccess } from "./authSlice";

export const loginUser = (email, password) => async (dispatch) => {
  const res = await axios.post("http://localhost:3000/auth/login", { email, password });
  await console.log(res.data);
  dispatch(loginSuccess(res.data));
};