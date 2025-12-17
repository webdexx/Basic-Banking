import { createSlice } from "@reduxjs/toolkit";

// const getToken = () => {
//   const token = sessionStorage.getItem("token");
//   return token && token !== "undefined" && token !== "null" ? token : null;
// };

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    loading: false,
    error: null,
    authMessage: null,
    accountStatus: null,
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
      state.accountStatus = flag;
    },
    loginFailed: (state, action) => {
      state.token = null;
      state.isAuth = false;
      state.loading = false;
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
