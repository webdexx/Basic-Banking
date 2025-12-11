import { Routes, Route } from "react-router-dom";
import React from "react";
const AuthLayout = React.lazy(() => import("@/features/auth/pages/AuthLayout"));
// import DashboardLayout from "@/layouts/DashboardLayout";
const DashboardLayout = React.lazy(() => import("@/layouts/DashboardLayout"));
const Overview = React.lazy(() => import("@/components/dashboard/Overview"));
const Transactions = React.lazy(() => import("@/components/dashboard/Transactions"));
const Settings = React.lazy(() => import("@/components/dashboard/Settings"));
const ProductCard  = React.lazy(() => import("@/components/dashboard/ProductCard"));
const SendMoney = React.lazy(() => import("@/components/dashboard/SendMoney"));
const KYCLayout = React.lazy(() => import("@/features/auth/pages/KYCLayout"));

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/*" element={<AuthLayout />} />
      
      <Route path="kyc/*" element={<KYCLayout />} />

      <Route path="dashboard/*" element={<DashboardLayout />} >
        <Route index element={<Overview />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="paid-cards" element={<ProductCard />} />
        <Route path="send-money" element={<SendMoney />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
