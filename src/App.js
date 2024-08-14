import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';


const App = () => (
  <Router>
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<DashboardPage />} />
            {/* Tambahkan rute lain sesuai kebutuhan */}
          </Routes>
  </Router>
);

export default App;
