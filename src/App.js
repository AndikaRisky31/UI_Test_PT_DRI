import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/DashboardLayout'
import DashboardPage from './pages/DashboardPage';
import StockPage from './pages/StockPage';
import PromoPage from './pages/PromoPage';
import VoucherPage from './pages/VoucherPage';
import RestaurantPage from './pages/RestaurantPage';
import CustomerLayout from './layout/CustomerLayout';
import CustomerPage from './pages/CustomerPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/stock" element={<StockPage />} />
          <Route path="/customer" element={<CustomerLayout />}>
            <Route index element={<CustomerPage />} />
            <Route path="promo" element={<PromoPage />} />
            <Route path="voucher" element={<VoucherPage />} />
          </Route>
          <Route path="/restaurant" element={<RestaurantPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;