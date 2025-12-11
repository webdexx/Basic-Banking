import Card from "./components/Card";
import "./Overview.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Suspense } from "react";
import {
  fetchTransactionById,
} from "@features/transactions/fetchTransactions";

import {
  LuArrowDownRight,
  LuArrowUpRight,
} from "react-icons/lu";

import TransactionDetails from "./TransactionView";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Overview() {
  const dispatch = useDispatch();

  useDocumentTitle("Account Overview");


  const { accountNumber, balance, blockedAmount, user } = useSelector(
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

  return (
    <>
      <h1>Welcome {user}</h1>
      {/* <div className="card__row">
        <Card className="hero__card">
          <div className="hero_heading">
            <MdOutlineBarChart className="hero_icon" />
            <h2>Performance Analysis</h2>
          </div>
          <Card className="hero_info">
            <AccountChart />
          </Card>
        </Card>
        <Card className="hero__card">
          <div className="hero_heading">
            <MdCompareArrows className="hero_icon" />
            <h2>Income vs Spend</h2>
          </div>
          <Card className="hero_info">
            {/* <Pie data={} className="pie_chart"/> */}
         {/*} </Card>
        </Card>
      </div> */}
      <Suspense fallback={<div>Loading...</div>} >
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
              <span>Account Number: {accountNumber} </span>
              <span
                className={status === "ACTIVE" ? "active_acc" : "inactive_acc"}
              >
                {status}
              </span>
            </div>
          </div>
        </Card>
      </div>
      <div className="card__row">
        {transactions.length > 0 && (
          <Card className="overview__transactions__card">
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
                              {isIncoming ? "Received " : "Sent "} {isIncoming ? (
                                <LuArrowDownRight />
                              ) : (
                                <LuArrowUpRight />
                              )}
                            </span>
                          </td>
                          <td>₹{tx.amount}/-</td>

                          <td>
                            <button className="primary-btn" onClick={() => handleView(tx._id)}>
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
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
                      className="close-btn"
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
