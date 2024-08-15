import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 pt-6 px-6">
        <Outlet /> {/* This renders the matched child route component */}
      </main>
    </div>
  );
};

export default DashboardLayout;
