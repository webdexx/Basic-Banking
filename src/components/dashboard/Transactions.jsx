import Card from "./components/Card";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions } from "@features/transactions/fetchTransactions";
import { MdArrowOutward, MdOutlineArrowDownward } from "react-icons/md";

export default function Transactions() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  
  useEffect(() => {
    document.title = "Transactions - Basic Banking";
  }, []);

  const {
    transactions = [],
    loading,
    error,
  } = useSelector((state) => state.transaction);

  // If you need to check authentication
  useEffect(() => {
    if (!isAuth) return;
    const interval = setTimeout(() => {
      dispatch(fetchTransactions());
    }, 3000);

    return () => clearInterval(interval);
  }, [dispatch, isAuth]);

  if (!isAuth) {
    return <div>Please login to access the dashboard</div>;
  }

  return (
    <>
      <h1>Welcome to Overview</h1>
      <div className="card__row">
        <Card className="overview__transactions__card">
          <h1>Top Transactions</h1>
          <div className="transaction__table">
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
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
                      console.log("Is Incoming or not", isIncoming);
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
                          <button>View</button>
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
    </>
  );
}
