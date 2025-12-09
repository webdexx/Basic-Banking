// fetchTransactions.js
import axios from "axios";
import { fetchTransactions } from "./fetchTransactions";

export const createTransactions =
  ({
    beneficiaryAccountNumber,
    beneficiaryIfsc,
    beneficiaryName,
    amount,
    description,
  }) =>
  async (dispatch) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found");
      }

      const payload = {
        beneficiaryAccountNumber,
        beneficiaryIfsc,
        beneficiaryName,
        amount: parseFloat(amount),
        description,
      };

      const res = await axios.post(
        "http://localhost:3000/transactions/send-money",
        payload,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(fetchTransactions());

      const body = res.data || {};
    const txOut =
      body.senderTransaction ||
      body.transactionOut ||
      body.transaction ||
      body.data?.senderTransaction ||
      null;

    const txIn =
      body.receiverTransaction ||
      body.transactionIn ||
      body.receiverTxn ||
      body.data?.receiverTransaction ||
      null;

    const balance =
      body.currentBalance || body.balance || body.current || null;

    // Return a consistent structure
    return {
      success: true,
      transaction: txOut,
      receiverTxn: txIn,
      balance,
      raw: body, // keep raw for debugging if needed
    };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };
