// transactionsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getToken = () => {
  const token = sessionStorage.getItem("token");
  return token && token !== "undefined" && token !== "null" ? token : null;
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    token: getToken(),
    transactions: [], // store array of txs
    latestTransaction: null, // optional: quick access to latest
    loading: false,
    error: null,
    isAuth: !!getToken(),
  },
  reducers: {
    fetchTransactionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTransactionsSuccess: (state, action) => {
      state.loading = false;
      state.transactions = action.payload.transactions || [];
      state.latestTransaction = state.transactions.length
        ? state.transactions[0]
        : null;
      // keep token if payload includes it
      if (action.payload.token) state.token = action.payload.token;
      state.isAuth = !!state.token;
    },
    fetchTransactionsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch transactions";
    },
    // optional: select a transaction by  id
    selectTransaction: (state, action) => {
      const id = action.payload;
      state.latestTransaction =
        state.transactions.find((t) => t._id === id) || null;
    },
    setLatestTransaction: (state, action) => {
      state.latestTransaction = action.payload || null;
    },
    clearTransaction: (state) => {
      state.transactions = [];
      state.error = null;
      state.token = null;
      state.id = null;
      state.user = null;
      state.isAuth = false;
    },
    setTransactionLoading: (state, action) => {
      state.loading = !!action.payload;
    },
  },
});

export const {
  fetchTransactionsStart,
  fetchTransactionsSuccess,
  fetchTransactionsFail,
  selectTransaction,
  clearTransaction,
  setLatestTransaction,
  setTransactionLoading
} = transactionSlice.actions;

export default transactionSlice.reducer;
