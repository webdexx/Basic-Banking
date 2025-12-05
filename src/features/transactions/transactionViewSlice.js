import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  transactionId: null,
};

const transactionViewSlice = createSlice({
  name: "ui/modal",
  initialState,
  reducers: {
    openTransactionModal(state, action) {
      state.isOpen = true;
      state.transactionId = action.payload; // pass tx id
    },
    closeTransactionModal(state) {
      state.isOpen = false;
      state.transactionId = null;
    },
  },
});

export const { openTransactionModal, closeTransactionModal } = transactionViewSlice.actions;
export default transactionViewSlice.reducer;
