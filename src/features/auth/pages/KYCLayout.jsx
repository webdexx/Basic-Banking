import { Routes, Route, useNavigate } from "react-router-dom";
import KycHeader from "../components/kyc/KycHeader";
import PersonalInfo from "../components/kyc/PersonalInfo";
import ProfessionalDetails from "../components/kyc/professionalDetails";
import "../styles/kyc-layout.css";
import KycSidebar from "../components/kyc/KycSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import StepGuard from "./StepGuard";
import { fetchKYC } from "../components/kyc/fetchKYC";
import PendingReview from "../components/kyc/PendingReview";

export default function KYCLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuth, accountStatus } = useSelector((state) => state.auth);
  const { personalInfo, documents, overallStatus, loaded } =
    useSelector((state) => state.kyc);

  useEffect(() => {
    if (!isAuth) return;

    document.title = "Complete Your KYC First - Basic Banking";

    dispatch(fetchKYC());
  }, [dispatch, isAuth]);

  useEffect(() => {
    if (!isAuth || !loaded) return;

    if (accountStatus === "PENDING") {
      if (!personalInfo) {
        navigate("/kyc/personal-info", { replace: true });
        return;
      }

      if (personalInfo === "COMPLETE" && documents === "ACTIVE") {
        navigate("/kyc/professional-info", { replace: true });
        return;
      }

      if (
        personalInfo === "COMPLETE" &&
        documents === "COMPLETE" &&
        overallStatus === "PENDING_REVIEW"
      ) {
        navigate("/kyc/pending-review", { replace: true });
        return;
      }
    }

    if (accountStatus === "APPROVED") navigate("/dashboard", { replace: true });
  }, [
    isAuth,
    loaded,
    accountStatus,
    personalInfo,
    documents,
    overallStatus,
    navigate,
  ]);

  if (!isAuth) {
    return null;
  }

  if(!loaded) {
    return <div>Loading KYC</div>
  }

  return (
    <div className="kyc__layout">
      <KycSidebar />
      <KycHeader />
      <div className="kyc__container">
        <Routes>
          <Route
            path="/personal-info"
            element={
              <StepGuard
                allowed={
                  (accountStatus === "PENDING" && personalInfo === "ACTIVE") ||
                  personalInfo === null
                }
                redirectTo="/"
              >
                <PersonalInfo />
              </StepGuard>
            }
          />
          <Route
            path="/professional-info"
            element={
              <StepGuard
                allowed={
                  accountStatus === "PENDING" &&
                  personalInfo === "COMPLETE" &&
                  documents === "ACTIVE"
                }
                redirectTo="/"
              >
                <ProfessionalDetails />
              </StepGuard>
            }
          />
          <Route
            path="/pending-review"
            element={
              <StepGuard
                allowed={
                  accountStatus === "PENDING" &&
                  personalInfo === "COMPLETE" &&
                  documents === "COMPLETE" &&
                  overallStatus === "PENDING_REVIEW"
                }
                redirectTo="/"
              >
                <PendingReview />
              </StepGuard>
            }
          />
        </Routes>
      </div>

      <div className="kyc__footer">
        <p>This is Footer</p>
        <p>This is menu</p>
      </div>
    </div>
  );
}
