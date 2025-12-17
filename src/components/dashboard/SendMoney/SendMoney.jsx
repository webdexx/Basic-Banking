import { useState } from "react";

import SendMoneyForm from "./components/SendMoneyForm";
import BeneficiaryList from "./components/BeneficiaryList";
import "./send-money.css";

export default function SendMoney() {
  const [isBeneficiary, setIsBeneficiary] = useState(false);

  return (
    <>
      <div className="beneficiary-change">
        <span>
          <input
          type="checkbox"
          onChange={() => setIsBeneficiary(!isBeneficiary)}
        /> {!isBeneficiary ? "Existing Beneficiary?" : "New Beneficiary"}
        </span>
      </div>

      {isBeneficiary && (
        <div className="beneficiary-list">
          <BeneficiaryList />
        </div>
      )}

      {!isBeneficiary && <SendMoneyForm />}
    </>
  );
}