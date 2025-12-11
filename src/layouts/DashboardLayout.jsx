import Sidebar from '@components/dashboard/Sidebar'
import Header from '@components/dashboard/Header'
import { Outlet, useNavigate } from 'react-router-dom';
import './layout.css'
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAccount } from '@/features/account/fetchAccount';
import { fetchTransactions } from '@/features/transactions/fetchTransactions';

export default function DashboardLayout() {
const dispatch = useDispatch();
const navigate = useNavigate();

const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuth) {
      navigate("/", { replace: true });
      return;
    }

    dispatch(fetchAccount());
  }, [dispatch, isAuth, navigate]);
  

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
