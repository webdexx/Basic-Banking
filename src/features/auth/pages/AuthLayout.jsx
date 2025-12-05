import Login from "@features/auth/components/Login/Login";
import Register from "@features/auth/components/Register/Register";
import "../styles/auth-layout.css";
import { Routes, Route } from "react-router-dom";
import Logo from "@assets/images/logo.png";
import RecoverAccount from "@features/auth/components/Login/RecoverAccount";

export default function AuthLayout() {
  return (
    <>
      <div className="auth__container">
        <div className="auth__form__window">
          <img src={Logo} alt="" className="brand-image" />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<RecoverAccount />} />
          </Routes>
        </div>
        <div className="info__window">
          <div className="info__container">
            <div className="card_window">
              <p className="card_number">xxxx-xxxx-xxxx-xxxx</p>
              <p className="card_name">JOHN DOE</p>
            </div>
            <h1>Get the Gold Card Today</h1>
            <p>Benefits upto 7% cashback on all transactions</p><br/>
            <button className="info_button">Get Your Card Today</button>
          </div>
        </div>
      </div>
    </>
  );
}
