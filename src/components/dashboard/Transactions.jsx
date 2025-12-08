import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdArrowOutward, MdOutlineArrowDownward } from "react-icons/md";

import TransactionDetails from "./TransactionView";
import Card from "./components/Card";
import {
  fetchTransactions,
  fetchTransactionById,
} from "@features/transactions/fetchTransactions";


export default function Transactions() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    document.title = "Transactions - Basic Banking";
  }, []);

  const {
    transactions = [],
  } = useSelector((state) => state.transaction);

  const [selectedTx, setSelectedTx] = useState(null);

  useEffect(() => {
    if (!isAuth) return;
    const t = setTimeout(() => {
      dispatch(fetchTransactions());
    }, 3000);

    return () => clearTimeout(t);
  }, [dispatch, isAuth]);

  if (!isAuth) {
    return <div>Please login to access the dashboard</div>;
  }

  const handleView = async (id) => {

    const tx = await dispatch(fetchTransactionById(id)); 

    if (!tx) {
      return;
    }

    setSelectedTx(tx);
  };

  return (
    <>
      <h1>Welcome to Overview</h1>
      <div className="card__row">
        <Card className="overview__transactions__card">
          <h1>Top Transactions</h1>
          <div className="transaction__table">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.length > 0 ? (
                  transactions.map((tx) => {
                    const isIncoming =
                      tx.type === "DEPOSIT" || tx.type === "TRANSFER_IN";
                    return (
                      <tr key={tx._id}>
                        <td className={isIncoming ? "tx__green" : "tx__red"}>
                          {isIncoming ? (
                            <MdOutlineArrowDownward />
                          ) : (
                            <MdArrowOutward />
                          )}{" "}
                          {tx.type}
                        </td>
                        <td>{tx.amount}</td>
                        <td>₹{tx.balanceAfter}</td>
                        <td>
                          <button onClick={() => handleView(tx._id)}>View</button>
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
          </div>
        </Card>
      </div>
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
    </>
  );
}
