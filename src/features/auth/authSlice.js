import { createSlice } from "@reduxjs/toolkit";

const getToken = () => {
  const token = sessionStorage.getItem("token");
  return token && token !== "undefined" && token !== "null" ? token : null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: getToken(),
    isAuth: !!getToken(),
    loading: false,
    error: null,
  },

  reducers: {
    loginSuccess: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      state.isAuth = true;
      sessionStorage.setItem("token", token);
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      state.isAuth = false;
      
      sessionStorage.removeItem("accountNumber");
      sessionStorage.removeItem("balance");
      sessionStorage.removeItem("blockedAmount");
      sessionStorage.removeItem("status");
      sessionStorage.clear();
      localStorage.clear();
      console.log("Logout Reducer Called");
      // console.clear();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
