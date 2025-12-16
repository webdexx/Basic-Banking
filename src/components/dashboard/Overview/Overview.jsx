import Card from "../components/Card";
import "./Overview.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { fetchTransactionById } from "@features/transactions/fetchTransactions";

import { LuArrowDownRight, LuArrowUpRight } from "react-icons/lu";

import TransactionDetails from "../Transactions/TransactionView";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Overview() {
  const dispatch = useDispatch();

  useDocumentTitle("Account Overview");

  const { accountNumber, balance, blockedAmount, user, loading } = useSelector(
    (state) => state.account
  );

  const { transactions } = useSelector((state) => state.transaction);
  const [selectedTx, setSelectedTx] = useState(null);

  const handleView = async (id) => {
    setSelectedTx(null);

    const tx = await dispatch(fetchTransactionById(id));

    if (!tx) {
      return;
    }
    setSelectedTx(tx);
  };


  if(loading) {
    setTimeout(() => {
          return (
      <div className="skeleton-container">
        <h1><Skeleton width={200} /></h1>
        <div className="card__row">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="overview__info__card">
              <Skeleton height={150} width={150}/>
            </Card>
          ))}
        </div>
        <div className="card__row">
          <Card className="table__container__card">
            <h1><Skeleton width={250} /></h1>
            <div className="skeleton-table">
              <Skeleton count={5} height={40} style={{ marginBottom: '10px' }} />
            </div>
          </Card>
        </div>
      </div>
    )
    }, 2000);
  }

  return (
    <>
      <h1>Welcome {user}</h1>
      <Suspense fallback={<Skeleton />}>
        <div className="card__row">
          <Card className="overview__info__card">
            <div>
              <span className="heading">Account Info</span>
              <div id="balance_info">
                <span>Available Balance: ₹{balance > 0 ? balance : 0}/-</span>
                <span>Blocked Amount: ₹{blockedAmount}/-</span>
              </div>
            </div>
          </Card>
          <Card className="overview__info__card">
            <div>
              <span className="heading">Active Products</span>
              <div id="balance_info">
                <span>₹{blockedAmount}/-</span>
              </div>
            </div>
          </Card>
          <Card className="overview__info__card">
            <div>
              <span className="heading">Account Details</span>
              <div id="balance_info">
                <span>Account Number: {accountNumber || <Skeleton />} </span>
                <span
                  className={
                    status === "ACTIVE" ? "active_acc" : "inactive_acc"
                  }
                >
                  {status}
                </span>
              </div>
            </div>
          </Card>
        </div>
        <div className="card__row">
          {transactions.length > 0 && (
            <Card className="table__container__card">
              <h1>Recent 5 Transactions</h1>
              <div className="">
                <table>
                  <thead>
                    <tr>
                      <th>Sender/Receiver</th>
                      <th>Transaction Type</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions?.length > 0 ? (
                      transactions.slice(0, 5).map((tx) => {
                        const isIncoming =
                          tx.type === "DEPOSIT" || tx.type === "TRANSFER_IN";
                        return (
                          <tr key={tx._id}>
                            <td>
                              {tx.beneficiaryDetails
                                ? tx.beneficiaryDetails.name
                                : `${user} (self)`}
                            </td>
                            <td>
                              <span
                                className={
                                  isIncoming
                                    ? "pill pill-success"
                                    : "pill pill-error"
                                }
                              >
                                {isIncoming ? "Received " : "Sent "}{" "}
                                {isIncoming ? (
                                  <LuArrowDownRight />
                                ) : (
                                  <LuArrowUpRight />
                                )}
                              </span>
                            </td>
                            <td>₹{tx.amount}/-</td>

                            <td>
                              <button
                                className="primary-btn btn"
                                onClick={() => handleView(tx._id)}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          {setTimeout(() => {
                            <Skeleton />;
                          }, 2000)}
                          No Transactions Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* show details (modal/panel) */}
                {selectedTx && (
                  <div className="modal-backdrop">
                    <div className="modal">
                      <TransactionDetails transaction={selectedTx} />
                      <button
                        className="close-btn btn"
                        onClick={() => setSelectedTx(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </Suspense>
    </>
  );
}
