import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/components/Login/authSlice";
import accountReducer from "@features/account/accountSlice";
import transactionReducer from "@features/transactions/transactionsSlice";
import transactionViewReducer from "@features/transactions/transactionViewSlice";
import registerUserReducer from "@features/auth/components/Register/registerSlice";
import kycReducer from "@features/auth/components/kyc/kycSlice";
import postPersonalInfoReducer from "@/features/auth/components/kyc/postPersonalInfoSlice";
import postProfessionalInfoReducer from "@/features/auth/components/kyc/postProfessionalInfoSlice";
import cardsReducer from "@/features/cards/cardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    transaction: transactionReducer,
    registerUser: registerUserReducer,
    kyc: kycReducer,
    postPersonalInfo: postPersonalInfoReducer,
    postProfessionalInfo: postProfessionalInfoReducer,
    cards: cardsReducer,
    ui: {
      modal: transactionViewReducer,
    },
  },
});
