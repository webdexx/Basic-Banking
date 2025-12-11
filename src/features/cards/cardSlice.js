import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "cards",
  initialState: {
    cardNo: "",
    limit: 0,
    cardType: null,
    expiryMonth: null,
    expiryYear: null,
    error: null,
    loading: false,
    token: null,
    id: null,
  },
  reducers: {
    fetchCardData: (state, action) => {
      const { cardNo, limit, cardType, expiryMonth, expiryYear, token } =
        action.payload || {} ;

      // Update all account fields
      state.cardNo = cardNo;
      state.limit = limit;
      state.cardType = cardType;
      state.expiryMonth = expiryMonth;
      state.expiryYear = expiryYear;
      state.loading = false;
      state.error = null;
      state.token = token;
    },
    clearCards: (state) => {
      state.cardNo = "";
      state.limit = 0.0;
      state.cardType = null;
      state.loading = false;
      state.error = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { fetchCardData, clearCards } = cardSlice.actions;
export default cardSlice.reducer;
