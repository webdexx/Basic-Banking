import axios from "axios";
import { fetchAccountData } from "./accountSlice";

export const fetchAccount = () => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token Found");
      return;
    }

    const res = await axios.get("http://localhost:3000/account/show", {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    // if(!res.ok) {
    //   console.log("No Account Details Fetched");
    //   return;
    // }

    if (res.data.accountDetails) {
      const accountData = {
        id: res.data.accountDetails._id,
        user: res.data.fullName,
        accountNumber: res.data.accountDetails.accountNumber,
        balance: res.data.accountDetails.balance,
        blockedAmount: res.data.accountDetails.blockedAmount,
        status: res.data.accountDetails.status,
        token: token, // Pass the token along
      };
      console.log("API Response ->", accountData);
      dispatch(fetchAccountData(accountData));
    } else {
      console.error("No accountDetails in response:", res.data);
    }
  } catch (err) {
    console.error("Error fetching account:", err);
  }
};
