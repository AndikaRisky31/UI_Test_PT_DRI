import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 px-6 pt-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
