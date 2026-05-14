import { useState } from "react";

import SendMoneyForm from "./components/SendMoneyForm";
import BeneficiaryList from "./components/BeneficiaryList";
import "./send-money.css";

export default function SendMoney() {
  const [isBeneficiary, setIsBeneficiary] = useState(false);

  return (
    <>

      <button className="tab-btn" onClick={() => setIsBeneficiary(true)}>Beneficiary List</button>
      <button className="tab-btn" onClick={() => setIsBeneficiary(false)}>Beneficiary Form</button>
      
      {isBeneficiary && (
        <div className="beneficiary-list">
          <BeneficiaryList />
        </div>
      )}

      {!isBeneficiary && <SendMoneyForm />}
    </>
  );
}