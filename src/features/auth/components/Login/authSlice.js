import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    loading: false,
    error: null,
    authMessage: null,
    accountStatus: null,
    checkRefresh: false,
  },

  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.isAuth = false;
      state.authMessage = "Signing In..";
    },
    onPageRefresh: (state, action) => {
      const { flag } = action.payload;
      state.isAuth = true;
      state.checkRefresh = true;
      state.error = null;
      state.authMessage = "Page Refreshed";
      state.accountStatus = flag;
    },
    loginSuccess: (state, action) => {
      const { flag } = action.payload;
      // state.token = token;
      state.isAuth = true;
      // sessionStorage.setItem("token", token);
      state.error = null;
      state.authMessage = "Login Success ✅";
      state.checkRefresh = true;
      state.accountStatus = flag;
    },
    loginFailed: (state, action) => {
      state.token = null;
      state.isAuth = false;
      state.loading = false;
      state.checkRefresh = true;
      state.error = action.payload;
      state.authMessage = null;
    },

    onLogout: (state) => {
      // state.token = null;
      state.user = null;
      state.role = null;
      state.isAuth = false;
      state.authMessage = "LoggedOut ⚠️";
      state.loading = false;
      state.checkRefresh = true;
      state.email = null;
      state.mobileNo = null;

      sessionStorage.removeItem("accountNumber");
      sessionStorage.removeItem("balance");
      sessionStorage.removeItem("blockedAmount");
      sessionStorage.removeItem("status");
      sessionStorage.clear();
      localStorage.clear();
    },
  },
});

export const { loginSuccess, onLogout, loginFailed, loginStart, authMessage, onPageRefresh } =
  authSlice.actions;
export default authSlice.reducer;
