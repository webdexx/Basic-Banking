import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/components/Login/authSlice";
import accountReducer from "@features/account/accountSlice";
import transactionReducer from "@features/transactions/transactionsSlice";
import transactionViewReducer from "@/features/transactions/transactionViewslice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    transaction: transactionReducer,
    ui: {
      modal: transactionViewReducer,
    }
  },
});
