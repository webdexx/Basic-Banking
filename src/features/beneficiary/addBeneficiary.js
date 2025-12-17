// fetchTransactions.js
import axios from "axios";
import { fetchBenList } from "./fetchBenificiary";

export const addBeneficiary =
    ({
        benAccountNo,
        benIfsc,
        benName
    }) =>
        async (dispatch) => {
            try {
                const payload = {
                    benAccountNo,
                    benIfsc,
                    benName
                };

                const res = await axios.post(
                    "http://localhost:3000/beneficiary/add",
                    payload,
                    { withCredentials: true }
                );

                dispatch(fetchBenList());

                return {
                    success: true,
                    benDetails: res.data
                };
            } catch (err) {
                return { success: false, error: err.response?.data?.message };
            }
        };
