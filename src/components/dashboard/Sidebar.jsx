import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";
import {
  MdOutlineSpaceDashboard,
  MdLogout,
  MdCurrencyRupee,
  MdCreditCard,
  MdArrowOutward,
  MdSettings,
  MdContactSupport,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { clearAccount } from "@features/account/accountSlice";
import { clearTransaction } from "@features/transactions/transactionsSlice";
import { logoutUser } from "@/features/auth/components/Login/logoutUser";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch({ type: "account/clearAccount" });
    dispatch(clearAccount());
    dispatch(clearTransaction());
    sessionStorage.clear();
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <Link className="sidebar__link" to="/dashboard/">
              <MdOutlineSpaceDashboard className="icon" /> Overview
            </Link>
          </li>
          <li>
            <Link className="sidebar__link" to="/dashboard/transactions">
              <MdCurrencyRupee className="icon" /> Transactions
            </Link>
          </li>
          <li>
            <Link className="sidebar__link" to="/dashboard/paid-cards">
              <MdCreditCard className="icon" /> Cards
            </Link>
          </li>
          <li>
            <Link className="sidebar__link" to="/dashboard/send-money">
              <MdArrowOutward className="icon" /> Send Money
            </Link>
          </li>
          <li>
            <Link className="sidebar__link" to="/dashboard/settings">
              <MdSettings className="icon" /> Settings
            </Link>
          </li>
        </ul>

        <div className="sidebar_footer">
          <button className="primary-btn" onClick={handleLogout}>
            <MdLogout className="icon" />
            <span>Logout</span>
          </button>
          <button className="primary-btn">
            <MdContactSupport className="icon" /> Support
          </button>
        </div>
      </div>
    </>
  );
}
