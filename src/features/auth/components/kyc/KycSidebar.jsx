import "./kyc-header.css";
import Logo from "@assets/images/logo-white.png";
import { useSelector } from "react-redux";

export default function KycSidebar() {
    const { personalInfo, documents, overallStatus } = useSelector((state) => state.kyc)
  
  return (
    <div className="kyc__sidebar">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <ul>
        <li className={personalInfo === "ACTIVE" ? "li_active" : ""}>Personal Info</li>
        <li className={documents === "ACTIVE" ? "active" : ""}>Documents</li>
        <li className={overallStatus === "PENDING_REVIEW" ? "active" : ""}>Review Application</li>
      </ul>
    </div>
  );
}
