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
    authMessage: null
  },

  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.isAuth = false;
      state.authMessage = "Signing In..";
    },
    loginSuccess: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      state.isAuth = true;
      sessionStorage.setItem("token", token);
      state.error = null;
      state.authMessage = "Login Success ✅";
    },
    loginFailed: (state, action) => {
      state.token = null;
      state.isAuth = false;
      state.loading = false;
      state.error = action.payload // What should I write Here
      state.authMessage = null;
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      state.isAuth = false;
      state.authMessage = "LoggedOut ⚠️";
      state.loading = false;
      
      sessionStorage.removeItem("accountNumber");
      sessionStorage.removeItem("balance");
      sessionStorage.removeItem("blockedAmount");
      sessionStorage.removeItem("status");
      sessionStorage.clear();
      localStorage.clear();
    },
  },
});

export const { loginSuccess, logout, loginFailed, loginStart, authMessage } = authSlice.actions;
export default authSlice.reducer;
