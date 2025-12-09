import { Routes, Route } from "react-router-dom";
import KycHeader from "../components/kyc/KycHeader";
import PersonalInfo from "../components/kyc/PersonalInfo";
import ProfessionalDetails from "../components/kyc/professionalDetails";
import '../styles/kyc-layout.css';
import KycSidebar from "../components/kyc/KycSidebar";

export default function KYCLayout() {
    return (
        <div className="kyc__layout">
            <KycSidebar />
            <KycHeader />
            <div className="kyc__container">
                <Routes >
                    <Route path="/personal-info" element={<PersonalInfo />} />
                    <Route path="/professional-info" element={<ProfessionalDetails />} />
                </Routes>
            </div>

            <div className="kyc__footer">
                <p>This is Footer</p>
                <p>This is menu</p>
            </div>
        </div>
    )
}