// fetchTransactions.js
import axios from "axios";
import {
  fetchTransactionsStart,
  fetchTransactionsSuccess,
  fetchTransactionsFail,
  setLatestTransaction,
  setTransactionLoading
} from "./transactionsSlice";
import { openTransactionModal } from "./transactionViewslice";

export const fetchTransactions = () => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return dispatch(fetchTransactionsFail("No token found"));
    }

    dispatch(fetchTransactionsStart());

    const res = await axios.get("http://localhost:3000/transactions/show", {
      headers: {
        // If backend expects 'Bearer <token>', change accordingly:
        // Authorization: `Bearer ${token}`
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    // res.data.transactions is an array in your sample response
    if (res.data && Array.isArray(res.data.transactions)) {
      // Optionally sort by createdAt if backend doesn't return sorted list
      const txs = res.data.transactions.slice().sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
      );

      dispatch(fetchTransactionsSuccess({
        transactions: txs,
        token
      }));
    } else {
      console.error("No transactions array in response:", res.data);
      dispatch(fetchTransactionsFail("Invalid response format"));
    }
  } catch (err) {
    console.error("Error fetching transactions:", err);
    dispatch(fetchTransactionsFail(err.message || "Network error"));
  }
};

export const fetchTransactionById = (id) => async (dispatch) => {
  if (!id) return null;

  const token = sessionStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return null;
  }

  // Use AbortController to allow cancelation
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    dispatch(setTransactionLoading(true));

    // Adjust url to your backend route e.g. /transactions/:id
    const res = await axios.get(`http://localhost:3000/transactions/${id}`, {
      headers: { Authorization: token, "Content-Type": "application/json" },
      signal, // axios supports AbortController signals
    });

    const body = res.data || {};
    // Normalize shapes — backend might return { transaction: {...} } or the tx directly
    const tx = body.transaction || body.transactionOut || body || null;

    dispatch(setLatestTransaction(tx));
    dispatch(setTransactionLoading(false));
    return tx;
  } catch (err) {
    dispatch(setTransactionLoading(false));

    // If aborted, just return null silently
    if (err.name === "CanceledError" || err.name === "AbortError") {
      return null;
    }

    console.error("fetchTransactionById error:", err.response?.data || err.message || err);
    dispatch(fetchTransactionsFail(err.response?.data?.message || err.message || "Failed to fetch transaction"));
    return null;
  } finally {
    // optional: nothing
    console.log("Evrything loaded");
  }
};

export const openAndFetchTransaction = (id) => async (dispatch) => {
  const tx = await dispatch(fetchTransactionById(id)); // returns tx or null
  if (tx) {
    dispatch(openTransactionModal(id));
    return tx;
  } else {
    // optionally show toast or return false
    return null;
  }
};