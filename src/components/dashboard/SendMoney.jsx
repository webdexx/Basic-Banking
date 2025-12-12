import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
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
      <div className="form__container">
        <h1>Send Money</h1>
        <Motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          id="transactionForm"
          onSubmit={handleTransaction}
        >
          <div className="form-section">
            <h2>Add Beneficiary Details</h2>
            <div className="form-group">
              <div className="input_container">
                <label htmlFor="beneficiaryAccountNumber">
                  Beneficiary Account Number
                </label>
                <input
                  type="text"
                  name="beneficiaryAccountNumber"
                  id="beneficiaryAccountNumber"
                  placeholder="Enter Beneficiary Account Number"
                  disabled={loading}
                />
              </div>
              <div className="input_container">
                <label htmlFor="beneficiaryAccountNumber">
                  Beneficiary IFSC Code
                </label>
                <input
                  type="text"
                  name="beneficiaryIfsc"
                  placeholder="Enter beneficiary IFSC Code"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input_container">
                <label htmlFor="beneficiaryName">Beneficiary Name</label>
                <input
                  type="text"
                  name="beneficiaryName"
                  placeholder="Enter beneficiary Name"
                  disabled={loading}
                />
              </div>
              <div className="input_container">
                <label htmlFor="beneficiaryName">Amount</label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter Amount"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input_container">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}

          <button disabled={loading} className="primary-btn" style={{ width: "20%"}}>
            {loading ? "Submitting..." : "Send Now"}
          </button>
        </Motion.form>
        {errorMessage && 
          <p className="error-message">{errorMessage} 🚫</p>
          }
      </div>



      
        {successData && (
          <Card className="response_container">
          <div className="success_box">
            <h3>Transaction Successful 🎉</h3>
            <p>
              <strong>Amount Sent:</strong> ₹{successData.amount}
            </p>
            <p>
              <strong>To Account:</strong>{" "}
              {successData.beneficiaryDetails.accountNumber}
            </p>
            <p>
              <strong>To:</strong> {successData.beneficiaryDetails.name}
            </p>
            <p>
              <strong>Balance Before Transaction:</strong> ₹
              {successData.balanceBefore}
            </p>
            <p>
              <strong>Clearing Balance:</strong> ₹{successData.balanceAfter}
            </p>
            <p>
              <strong>Reference ID:</strong> {successData.transactionReference}
            </p>
          </div>
          </Card>
        )}
      
    </>
  );
}
