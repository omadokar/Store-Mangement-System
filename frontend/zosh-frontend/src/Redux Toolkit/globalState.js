import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import customerReducer from "./features/Customer/customerSlice";
import userReducer from "./features/User/userSlice";
import orderReducer from "./features/Order/orderSlice";
import refundReducer from './features/Refund/refundSlice';
import shiftReportReducer from './features/ShiftReport/shiftReportSlice';
import branchReducer from './features/Branch/branchSlice';
import categoryReducer from './features/Category/categorySlice';
import employeeReducer from './features/Employee/employeeSlice';
import storeReducer from './features/Store/storeSlice';
import productReducer from './features/Product/productSlice';

const gobalState = configureStore({
    reducer: {
        auth: authReducer,
        customer: customerReducer,
        user: userReducer,
        order: orderReducer,
        refund: refundReducer,
        shiftReport: shiftReportReducer,
        branch: branchReducer,
        category: categoryReducer,
        employee: employeeReducer,
        store: storeReducer,
        product: productReducer
    }
})
export default gobalState;