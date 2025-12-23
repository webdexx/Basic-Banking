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
import beneficiaryReducer from "@/features/beneficiary/beneficiarySlice";

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
    beneficiaries: beneficiaryReducer,
    ui: {
      modal: transactionViewReducer,
    },
  },
});
