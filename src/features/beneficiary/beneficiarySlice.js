import { createSlice } from "@reduxjs/toolkit";

const benSlice = createSlice({
    name: "beneficiary",
    initialState: {
        benLoading: true,
        benLoaded: false,
        beneficiaries: [],
        error: false,
    },
    reducers: {
        fetchBeneficiariesStart: (state) => {
            state.benLoading = true;
            state.error = null;
        },
        fetchBeneficiariesSuccess: (state, action) => {
            state.benLoading = false;
            state.benLoaded = true;
            state.beneficiaries = action.payload.beneficiaries;
            state.error = null;
        },
        fetchBeneficiariesFailed: (state, action) => {
            state.benLoading = false;
            state.benLoaded = false;
            state.error = action.payload.error;
        },
    }
});

export const { fetchBeneficiariesStart, fetchBeneficiariesSuccess, fetchBeneficiariesFailed } = benSlice.actions;

export default benSlice.reducer;