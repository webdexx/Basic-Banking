import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import "./transactionform.css";
import Card from "./components/Card";

import { createTransactions } from "@/features/transactions/createTransaction";

export default function SendMoney() {
  const dispatch = useDispatch();
  const { isAuth, error } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Send Money - Basic Banking";
  }, []);

  console.log("isAuth: ", isAuth);

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const handleTransaction = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessData(null);

    try {
      const amount = e.target.amount.value;
      const description = e.target.description.value;
      const beneficiaryAccountNumber = e.target.beneficiaryAccountNumber.value;
      const beneficiaryIfsc = e.target.beneficiaryIfsc.value;
      const beneficiaryName = e.target.beneficiaryName.value;

      const result = await dispatch(
        createTransactions({
          beneficiaryAccountNumber,
          beneficiaryIfsc,
          beneficiaryName,
          amount,
          description,
        })
      );
      if (!result.success) {
        setErrorMessage(result.error || "Transaction failed");
      } else {
        console.log("Result Transactions Data", result.transaction);
        setSuccessData(result.transaction); // store transaction details
      }
    } catch (err) {
      setErrorMessage("Something went wrong", err);
      // Show error message to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="transaction_form_container">
        <Motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          id="transactionForm"
          onSubmit={handleTransaction}
        >
          <h3>Send Money</h3>
          {error && <p className="error-message">{error}</p>}
          <div className="form_group">
            <input
              name="beneficiaryAccountNumber"
              placeholder="Enter Beneficiary Account Number"
              disabled={loading}
            />
            <input
              name="beneficiaryIfsc"
              placeholder="Enter beneficiary IFSC Code"
              disabled={loading}
            />
          </div>

          <input
            name="beneficiaryName"
            placeholder="Enter beneficiary Name"
            disabled={loading}
          />
          <input name="amount" placeholder="Enter Amount" disabled={loading} />
          <input
            name="description"
            placeholder="Description"
            disabled={loading}
          />
          <button disabled={loading}>
            {loading ? "Submitting..." : "Send Now"}
          </button>
        </Motion.form>
      </div>

      <Card className="response_container">
        {errorMessage && <p className="error-message">{errorMessage} 🚫</p>}
        {successData && (
          <div className="success_box">
            <h3>Transaction Successful 🎉</h3>
            <p>
              <strong>Amount Sent:</strong> ₹{successData.amount}
            </p>
            <p>
              <strong>To Account:</strong> {successData.beneficiaryDetails.accountNumber}
            </p>
            <p>
              <strong>To:</strong> {successData.beneficiaryDetails.name}
            </p>
            <p>
              <strong>Balance Before Transaction:</strong> ₹
              {successData.balanceBefore}
            </p>
            <p>
              <strong>Clearing Balance:</strong> ₹
              {successData.balanceAfter}
            </p>
            <p>
              <strong>Reference ID:</strong> {successData.transactionReference}
            </p>
          </div>
        )}
      </Card>
    </>
  );
}
