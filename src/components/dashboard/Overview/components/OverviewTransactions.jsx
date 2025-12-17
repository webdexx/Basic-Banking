import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactionById } from "@/features/transactions/fetchTransactions";
import Card from "../../components/Card";
import TransactionDetails from "../../Transactions/TransactionView";
import { LuArrowDownRight, LuArrowUpRight } from "react-icons/lu";

export default function OverviewTransactions() {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transaction);
  const [selectedTx, setSelectedTx] = useState(null);

  const { userFullName } = useSelector((s) => s.kyc);

  const handleView = async (id) => {
    setSelectedTx(null);

    const tx = await dispatch(fetchTransactionById(id));

    if (!tx) {
      return;
    }
    setSelectedTx(tx);
  };

  return (
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
                            : `${userFullName} (You)` }
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
              <div className="modal-backdrop" >
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
  );
}
