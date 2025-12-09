import { createSlice } from "@reduxjs/toolkit";

const getToken = () => {
  const token = sessionStorage.getItem("token");
  return token && token !== "undefined" && token !== "null" ? token : null;
};

const accountSlice = createSlice({
  name: "account",
  initialState: {
    token: getToken(),
    accountNumber: "",
    balance: 0,
    blockedAmount: 0,
    status: "Logged out",
    loading: false,
    error: null,
    id: null, // Added
    user: null, // Added
    isAuth: false, // Added
    flag: "PENDING",
  },
  reducers: {
    fetchAccountData: (state, action) => {
      const {
        accountNumber,
        balance,
        blockedAmount,
        status,
        id,
        user,
        flag,
        token,
      } = action.payload;

      // Update all account fields
      state.accountNumber = accountNumber || "x";
      state.balance = balance || 0;
      state.blockedAmount = blockedAmount || 0;
      state.status = status || state.status;
      state.id = id || state.id;
      state.user = user || state.user;
      state.token = token || state.token;
      state.isAuth = true;
      state.loading = false;
      state.error = null;
      state.flag = flag || state.flag;
    },
    clearAccount: (state) => {
      state.accountNumber = "";
      state.balance = 0.0;
      state.blockedAmount = 0.0;
      state.status = "Loading...";
      state.loading = false;
      state.error = null;
      state.token = null;
      state.id = null;
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { fetchAccountData, clearAccount } = accountSlice.actions;
export default accountSlice.reducer;
