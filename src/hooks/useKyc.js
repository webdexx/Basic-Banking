import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useKycState = () => {
  const { accountStatus } = useSelector((state) => state.auth);
  const { personalInfo, documents, overallStatus } = useSelector(
    (state) => state.kyc
  );

  return useMemo(() => {
    if (accountStatus === "PENDING") {
      if (personalInfo === "ACTIVE") {
        return "personal-info";
      } else if (personalInfo === "COMPLETE" && documents === "ACTIVE") {
        return "professional-info";
      } else if (
        personalInfo === "COMPLETE" &&
        documents === "COMPLETE" &&
        overallStatus === "PENDING_REVIEW"
      ) {
        return "pending-review";
      }
    }
    return null;
  }, [accountStatus, personalInfo, documents, overallStatus]);
};