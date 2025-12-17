import axios from "axios";
import {
  fetchTransactionsStart,
  fetchTransactionsSuccess,
  fetchTransactionsFail,
  setLatestTransaction,
  setTransactionLoading,
} from "./transactionsSlice";
import { openTransactionModal } from "./transactionViewSlice";

export const fetchTransactions = () => async (dispatch) => {
  try {
    dispatch(fetchTransactionsStart());

    const res = await axios.get("http://localhost:3000/transactions/show", {
      withCredentials: true,
    });

    if (res.data && Array.isArray(res.data.transactions)) {
      const txs = res.data.transactions
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      dispatch(
        fetchTransactionsSuccess({
          transactions: txs,
        })
      );
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

  const controller = new AbortController();
  const signal = controller.signal;

  try {
    dispatch(setTransactionLoading(true));

    const res = await axios.get(
      `http://localhost:3000/transactions/${id}`,
      {
        signal,
        withCredentials: true
      },
    );

    const body = res.data || {};
    const tx = body.transaction || body.transactionOut || body || null;

    dispatch(setLatestTransaction(tx));
    dispatch(setTransactionLoading(false));
    return tx;
  } catch (err) {
    dispatch(setTransactionLoading(false));

    if (err.name === "CanceledError" || err.name === "AbortError") {
      return null;
    }

    console.log(
      "fetchTransactionById error:",
      err.response?.data || err.message || err
    );
    dispatch(
      fetchTransactionsFail(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch transaction"
      )
    );
    return null;
  } finally {
    // optional: nothing
  }
};

export const openAndFetchTransaction = (id) => async (dispatch) => {
  const tx = await dispatch(fetchTransactionById(id));
  if (tx) {
    dispatch(openTransactionModal(id));
    return tx;
  } else {
    return null;
  }
};
