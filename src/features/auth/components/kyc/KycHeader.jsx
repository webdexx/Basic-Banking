import "./kyc-header.css";
import { FiLogOut, FiHelpCircle } from "react-icons/fi";
import { logout } from "@/features/auth/components/Login/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function KycHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.clear();
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="kyc__header">
      <div className="kyc__nav">
        <div className="menu">
          <button onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
          <button>
            Help <FiHelpCircle />
          </button>
        </div>
      </div>
    </div>
  );
}
