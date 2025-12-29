import React from 'react';
import './App.css';
import CashierRoutes from './Routes/CashierRoutes';
import { Routes } from 'react-router';
import { Route } from 'react-router';
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import { useDispatch } from 'react-redux';
import { getUser } from './Redux Toolkit/features/User/userThunk';
import { useEffect } from 'react';
import StoreManagement from './pages/StoreManagement';
import BranchManagement from './pages/BranchManagement';
import CustomerManagement from './pages/CustomerManagement';
import EmployeeManagement from './pages/EmployeeManagement';
import Home from './pages/Home';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(localStorage.getItem("jwt")));
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/cashier/*" element={<CashierRoutes />} />
        <Route path="/store" element={<StoreManagement />} />
        <Route path="/branch" element={<BranchManagement />} />
        <Route path="/employee" element={<EmployeeManagement />} />
        <Route path="/customer" element={<CustomerManagement />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
