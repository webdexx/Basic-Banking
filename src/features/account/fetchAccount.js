import axios from "axios";
import { fetchAccountData } from "./accountSlice";

export const fetchAccount = () => async (dispatch) => {
  try {

    const res = await axios.get(
      "http://localhost:3000/account/show",
      { withCredentials: true }
    );

    if (res.data.accountDetails) {
      const accountData = {
        id: res.data.accountDetails._id,
        user: res.data.fullName,
        accountNumber: res.data.accountDetails.accountNumber,
        balance: res.data.accountDetails.balance,
        blockedAmount: res.data.accountDetails.blockedAmount,
        status: res.data.accountDetails.status,
      };
      dispatch(fetchAccountData(accountData));
    } else {
      console.error("No accountDetails in response:", res.data);
    }
  } catch (err) {
    console.error("Error fetching account:", err);
  }
};
