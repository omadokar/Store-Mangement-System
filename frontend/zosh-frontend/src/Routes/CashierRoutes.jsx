import React from "react";
import { Routes, Route } from "react-router";
import CreateOrder from "../pages/cashier/CreateOrder";
import OrderHistory from "../pages/cashier/Order History/OrderHistory";
import CustomerManagement from "../pages/CustomerManagement";
import ReturnPage from "../pages/cashier/Refund/RefundPage";
import ShiftSummary from "../pages/cashier/Shift Report/ShiftSummary";
import ResetPassword from "../pages/Auth/ResetPassword";
import UserProfile from "../pages/cashier/UserProfile";
import ProductManagement from "../pages/ProductManagement";

const CashierRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<CreateOrder />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/order" element={<OrderHistory />} />
            <Route path="/customer" element={<CustomerManagement />} />
            <Route path="/return" element={<ReturnPage />} />
            <Route path="/product/*" element={<ProductManagement />} />
            <Route path="/shift" element={<ShiftSummary />} />
            <Route path="/profile" element={<UserProfile />} />
        </Routes>
    );
};

export default CashierRoutes;
