import { useSelector } from "react-redux";
import Card from "../../components/Card";
import Skeleton from "react-loading-skeleton";


export default function OverviewInfo() {
  const { accountNumber, balance, blockedAmount, loading } = useSelector(
    (state) => state.account
  );
    console.log(loading);

  if (!accountNumber) {
    setTimeout(() => {
      return (
        <div className="skeleton-container">
          <h1>
            <Skeleton width={200} />
          </h1>
          <div className="card__row">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overview__info__card">
                <Skeleton height={150} width={150} />
              </Card>
            ))}
          </div>
        </div>
      );
    }, 2000);
  }

  return (
    <div className="overview-info">
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
              <span>{blockedAmount || <Skeleton />}</span>
            </div>
          </div>
        </Card>
        <Card className="overview__info__card">
          <div>
            <span className="heading">Account Details</span>
            <div id="balance_info">
              <span>Account Number: {accountNumber || <Skeleton />} </span>
              <span
                className={status === "ACTIVE" ? "active_acc" : "inactive_acc"}
              >
                {status}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
