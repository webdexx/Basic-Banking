import Card from "../components/Card";
import "./Overview.css";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import OverviewInfo from "./components/OverviewInfo";
import OverviewTransactions from "./components/OverviewTransactions";

export default function Overview() {

  useDocumentTitle("Account Overview");

  const { userFullName } = useSelector((s) => s.kyc );

  return (
    <>
      <h1>Welcome {userFullName}</h1>
      <Suspense fallback={<Skeleton />}>
        <OverviewInfo />
        <OverviewTransactions />
      </Suspense>
    </>
  );
}
