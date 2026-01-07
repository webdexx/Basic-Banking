import "./kyc-header.css";
import { FiLogOut, FiHelpCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Login/logoutUser";


export default function KycHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    sessionStorage.clear();
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="kyc__header">
      <div className="kyc__nav">
        <div className="menu">
          <button className="primary-btn btn" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
          <button className="primary-btn btn">
            Help <FiHelpCircle />
          </button>
        </div>
      </div>
    </div>
  );
}
