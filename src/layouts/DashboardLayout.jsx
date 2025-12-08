import Sidebar from '@components/dashboard/Sidebar'
import Header from '@components/dashboard/Header'
import { Outlet } from 'react-router-dom';
import './layout.css'
import { useSelector } from 'react-redux';

export default function DashboardLayout() {

  const {  }
  
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
