// TransactionDetails.jsx
import React from "react";

import "./transaction-details.css";

import {
  MdOutlineReceiptLong,
} from "react-icons/md";
import {
  LuArrowDownRight,
  LuArrowUpRight,
  LuReceiptIndianRupee, 
  LuAlignStartVertical,
  LuBoxes,
} from "react-icons/lu";

export default function TransactionDetails({ transaction }) {
  const raw = transaction || null || {};
  const tx = raw.transactionOut || raw.transaction || raw; // normalized transaction object

  // sender & beneficiary detection with fallbacks
  const sender =
    tx.senderDetails ||
    (raw.transactionIn && raw.transactionIn.senderDetails) ||
    null;
  const beneficiary =
    tx.beneficiaryDetails ||
    (raw.transactionOut && raw.transactionOut.beneficiaryDetails) ||
    null;

  // UI
  return (
    <div className="transaction__wrapper">
      <h2>
        <LuReceiptIndianRupee className="tx_icon" /> Transaction Details
      </h2>

      <div className="txn-details">
        <div className="txn_group">
          <section className="basic_txn">
            <p>
              <strong>Transaction Type:</strong>{" "}
              <span
                className={
                  tx.transactionType === "Money Sent" ||
                  tx.type === "Money Sent"
                    ? "pill pill-error"
                    : "pill pill-success"
                }
              >
                {tx.transactionType || tx.type}{" "}
                {tx.transactionType === "Money Sent" ||
                tx.type === "Money Sent" ? (
                  <LuArrowUpRight />
                ) : (
                  <LuArrowDownRight />
                )}
              </span>
            </p>
            <p>
              <strong>Amount: </strong>
              {tx.transactionType === "Money Sent" || tx.type === "Money Sent"
                ? `(-)₹${tx.amount}`
                : `(+)₹${tx.amount}`}
            </p>
            <p>
              <strong>Reference:</strong> {tx.transactionReference}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {tx.createdAt ? new Date(tx.createdAt).toLocaleString() : "—"}
            </p>
          </section>

          <section className="basic_txn">
            <h4>Account Balance</h4>
            <p>
              <strong>Before:</strong> ₹{tx.balanceBefore ?? "—"}
            </p>
            <p>
              <strong>Clearing Balance:</strong> ₹{tx.balanceAfter ?? "—"}
            </p>
          </section>
        </div>

        {(tx.transactionType === "Money Received" ||
          tx.type === "TRANSFER_IN") && (
          <section>
            <h4>Sender Details</h4>
            <div className="txn_group">
              <p>
                <strong>Name:</strong> {sender?.name || "—"}
              </p>
              <p>
                <strong>Account:</strong> {sender?.accountNumber || "—"}
              </p>
              <p>
                <strong>IFSC:</strong> {sender?.ifscCode || sender?.ifsc || "—"}
              </p>
            </div>
          </section>
        )}

        {(tx.transactionType === "Money Sent" ||
          tx.type === "TRANSFER_OUT") && (
          <section>
            <h4>Beneficiary :</h4>
            <div className="txn_group">
              <p>
                <strong>Name:</strong> {beneficiary?.name || "—"}
              </p>
              <p>
                <strong>Account:</strong> {beneficiary?.accountNumber || "—"}
              </p>
            </div>
          </section>
        )}

        <br />
        <section>
          <h4>Description :</h4>
          <div className="tx_description">
            <p className="">{tx.description || "—"}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
