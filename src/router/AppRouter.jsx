import { Routes, Route } from "react-router-dom";
import AuthLayout from "../features/auth/pages/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import Overview from "@/components/dashboard/Overview"
import Transactions from "@/components/dashboard/Transactions"
import Settings from "@/components/dashboard/Settings"
import ProductCard from "@/components/dashboard/ProductCard";
import SendMoney from "@/components/dashboard/SendMoney"
import Logout from "@/features/auth/components/Login/Logout";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/*" element={<AuthLayout />} />
      
      <Route path="dashboard/*" element={<DashboardLayout />} >
        <Route index element={<Overview />}>
        </Route>
        <Route path="transactions" element={<Transactions />} />
        <Route path="paid-cards" element={<ProductCard />} />
        <Route path="send-money" element={<SendMoney />} />
        <Route path="settings" element={<Settings />} />
        <Route path="logout" element={<Logout />} />
      </Route>
    </Routes>
  );
}
