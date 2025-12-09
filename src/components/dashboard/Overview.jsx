import Card from "./components/Card";
import "./Overview.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccount } from "@features/account/fetchAccount";
import {
  fetchTransactions,
  fetchTransactionById,
} from "@features/transactions/fetchTransactions";
import { MdArrowOutward, MdOutlineArrowDownward, MdOutlineBarChart, MdCompareArrows  } from "react-icons/md";
import TransactionDetails from "./TransactionView";
import PerformanceChart from "./components/PeformanceCard";
import { replace, useNavigate } from "react-router-dom";

export default function Overview() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const accountStatus = useSelector((state) => state.auth.accountStatus);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Overview - Basic Banking";
  }, []);



  const { accountNumber, balance, blockedAmount, status, user } = useSelector(
    (state) => state.account
  );

  const { transactions } = useSelector((state) => state.transaction);
  const [selectedTx, setSelectedTx] = useState(null);
 
  // If you need to check authentication
  useEffect(() => {
    if (!isAuth) return;

    if(accountStatus !== "APPROVED"){
      navigate("/", replace(true));
    }

    dispatch(fetchAccount());

    const interval = setTimeout(() => {
      dispatch(fetchTransactions());
    }, 3000);

    return () => clearInterval(interval);
  }, [dispatch, isAuth, accountStatus]);

  if (!isAuth) {
    return <div>Please login to access the dashboard</div>;
  }

  const handleView = async (id) => {
    setSelectedTx(null);

    const tx = await dispatch(fetchTransactionById(id)); // thunk returns tx or null

    if (!tx) {
      return;
    }
    // tx might be the transaction object or an object with wrapper
    setSelectedTx(tx);
    // Optionally open modal here; we just render below
  };





  return (
    <>
      <h1>Welcome to Overview</h1>
      <div className="card__row">
        <Card className="hero__card">
          <div className="hero_heading">
            <MdOutlineBarChart className="hero_icon"/><h2>Performance Analysis</h2>
          </div>
          <Card className="hero_info">
            <PerformanceChart />
          </Card>
        </Card>
        <Card className="hero__card">
          <div className="hero_heading">
            <MdCompareArrows className="hero_icon"/><h2>Income vs Spend</h2>
          </div>
          <Card className="hero_info">
            {/* <Pie data={} className="pie_chart"/> */}
          </Card>
        </Card>
      </div>
      <div className="card__row">
        <Card>
          <span className="heading">Account Info</span>
          <div className="overview__info__card">
            <div id="balance_info">
              <span>Available Balance: ₹{balance > 0 ? balance : 0}/-</span>
              <span>Blocked Amount: ₹{blockedAmount}/-</span>
            </div>
          </div>
        </Card>
        <Card>
          <div className="overview__info__card">
            <span className="heading">Active Products</span>
            <div id="balance_info">
              <span>₹{blockedAmount}/-</span>
            </div>
          </div>
        </Card>
        <Card>
          <div className="overview__info__card">
            <span className="heading">Account Details</span>
            <div id="balance_info">
                <span>Account Number: {accountNumber} </span>
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
        <Card className="overview__transactions__card">
          <h1>Recent 5 Transactions</h1>
          <div className="transaction__table">
            <table>
              <thead>
                <tr>
                  <th>Sender/Receiver</th>
                  <th>Transaction Type</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Clearing Balance</th>
                  <th>Reference Number</th>
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
                        <td className={isIncoming ? "tx__green" : "tx__red"}>
                          {isIncoming ? (
                            <MdOutlineArrowDownward />
                          ) : (
                            <MdArrowOutward />
                          )}{" "}
                          {tx.type}
                        </td>
                        <td>{tx.amount}</td>
                        <td>{tx.description}</td>
                        <td>{tx.balanceAfter}</td>
                        <td>{tx.transactionReference}</td>

                        <td>
                          <button onClick={() => handleView(tx._id)}>
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
      </div>
    </>
  );
}
