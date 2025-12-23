import axios from "axios";
import { fetchBeneficiariesFailed, fetchBeneficiariesStart, fetchBeneficiariesSuccess } from "./beneficiarySlice";

export const fetchBenList = () => async (dispatch) => {
    dispatch(fetchBeneficiariesStart());
    try {
        const res = await axios.get("http://localhost:3000/beneficiary/get",
            { withCredentials: true }
        );
        dispatch(fetchBeneficiariesSuccess(res.data));
    } catch (error) {
        dispatch(
            fetchBeneficiariesFailed(
                error.response?.data?.message || "Failed to fetch beneficiaries"
            )
        );
    }
};