import Sidebar from '@components/dashboard/Sidebar'
import Header from '@components/dashboard/Header'
import { Outlet, useNavigate } from 'react-router-dom';
import './layout.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAccount } from '@/features/account/fetchAccount';
import { fetchTransactions } from '@/features/transactions/fetchTransactions';
import { fetchCard } from '@/features/cards/fetchCards';
import { fetchFullKyc } from '@/features/auth/components/kyc/fetchKYC';
import { fetchMe } from '@/features/auth/components/Login/fetchMe';

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth, checkRefresh } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  useEffect(() => {
    if (!checkRefresh) return;

    if (!isAuth) {
      navigate("/", { replace: true });
    }

    dispatch(fetchAccount());
    dispatch(fetchCard());
    dispatch(fetchFullKyc());
  }, [dispatch, isAuth, navigate, checkRefresh]);


  const { status } = useSelector(
    (state) => state.account
  );

  useEffect(() => {
    if (status !== undefined && status !== null) {
      if (status !== "ACTIVE") {
        navigate("/", { replace: true });
      }

      const t = setTimeout(() => {
        dispatch(fetchTransactions());
      }, 1000);

      return () => clearTimeout(t);
    }
  }, [dispatch, isAuth, status, navigate]);

  if (!isAuth) {
    if (!checkRefresh) {
      return <div>Checking Auth Status</div>;
    }
    return <div>Please login to access the dashboard</div>;
  }

  return (
    <>
      <div className="dashboard-layout">
        <Header />
        <div className="content-area">
          <Sidebar />

          {/* This will render the nested routes (Overview, Transactions, Settings) */}
          <Outlet />
        </div>
      </div>
    </>
  );
}
