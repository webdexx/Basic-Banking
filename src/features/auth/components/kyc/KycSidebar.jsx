import "./kyc-header.css";
import Logo from "@assets/images/logo-white.png";
import { useSelector } from "react-redux";

export default function KycSidebar() {

  const { personalInfo, documents, overallStatus } = useSelector(
    (state) => state.kyc
  );

  console.log("Sidebar KYC:", { personalInfo, documents, overallStatus });

  const getCurrentStep = () => {
    if (overallStatus === "PENDING_REVIEW" || documents === "COMPLETE") {
      return 3;
    }

    if (personalInfo === "COMPLETE") {
      return 2;
    }

    return 1;
  };

  const currentStep = getCurrentStep();

  console.log(currentStep);


  return (
    <div className="kyc__sidebar">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <ul>
        <li className={currentStep === 1 ? "active" : "inactive"}>Personal Info</li>
        <li className={currentStep === 2 ? "active" : "inactive"}>Documents</li>
        <li className={currentStep === 3 ? "active" : "inactive"}>Review Application</li>
      </ul>
      
    </div>
  );
}
